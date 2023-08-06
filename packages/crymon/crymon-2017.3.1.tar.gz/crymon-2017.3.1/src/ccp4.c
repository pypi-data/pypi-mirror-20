#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <stdint.h>
#include "ccp4.h"


#ifndef M_PI
    #define M_PI ((float)(3.14159265358979323846))
#endif
#define D2R ((float)(M_PI / 180.0))
#define UB_BUF sizeof(float) * 3 * 3
#define ALPHA 90.0f
#define S 10.0f
#define max(a,b) \
   ({ __typeof__ (a) _a = (a); \
       __typeof__ (b) _b = (b); \
     _a > _b ? _a : _b; })
#define min(a,b) \
   ({ __typeof__ (a) _a = (a); \
       __typeof__ (b) _b = (b); \
     _a < _b ? _a : _b; })


static void minvert3x3(float in[3][3], float out[3][3]) {
    size_t i, j;
    float det;

    det = 0;
    for(i=0; i<3; ++i)
        det += in[0][i] * (
            in[1][(i+1) % 3] * in[2][(i+2) % 3] -
            in[1][(i+2) % 3] * in[2][(i+1) % 3]
        );

    for(i=0; i<3; ++i)
        for(j=0; j<3; ++j)
           out[j][i] = (
               (in[(i+1) % 3][(j+1) % 3] * in[(i+2) % 3][(j+2) % 3]) -
               (in[(i+1) % 3][(j+2) % 3] * in[(i+2) % 3][(j+1) % 3])
           ) / det;
}


static void mmult3x3(float in1[3][3], float in2[3][3], float out[3][3]) {
    size_t i, j, t;

    for (i=0; i<3; ++i)
        for (j=0; j<3; ++j) {
            out[i][j] = 0.0;
            for (t=0; t<3; ++t)
                out[i][j] += in1[i][t] * in2[t][j];
        }
}


static void calc_cell(geometry *geo) {
    float ca, cb, cg, sg;

    ca = cosf(geo->par->cell_alpha);
    cb = cosf(geo->par->cell_beta);
    cg = cosf(geo->par->cell_gamma);
    sg = sinf(geo->par->cell_gamma);
    geo->mtx->cell[0][0] = geo->par->cell_a;
    geo->mtx->cell[0][1] = geo->par->cell_b * cg;
    geo->mtx->cell[0][2] = geo->par->cell_c * cb;
    geo->mtx->cell[1][0] = 0;
    geo->mtx->cell[1][1] = geo->par->cell_b * sg;
    geo->mtx->cell[1][2] = -geo->par->cell_c * (cb * cg - ca) / sg;
    geo->mtx->cell[2][0] = 0;
    geo->mtx->cell[2][1] = 0;
    geo->mtx->cell[2][2] = geo->par->cell_c * sqrtf(sg * sg - cb * cb - ca * ca + 2 * cb * cg * ca) / sg;
}


static void calc_b(geometry *geo) {
    minvert3x3(geo->mtx->cell, geo->mtx->b);
}


static void calc_u(geometry *geo) {
    size_t i, j;

    mmult3x3(geo->mtx->ub, geo->mtx->cell, geo->mtx->u);
    for(i=0; i<3; ++i)
        for(j=0; j<3; ++j)
            geo->mtx->u[i][j] /= geo->par->wavelength;
}


static void cvect(float b[3][3], t_hkl *p, float *vec_out, t_hkl *hkl_out) {
    float i0, i1, i2;

    i0 = b[0][0] * p->h + b[0][1] * p->k + b[0][2] * p->l;
    i1 = b[1][0] * p->h + b[1][1] * p->k + b[1][2] * p->l;
    i2 = b[2][0] * p->h + b[2][1] * p->k + b[2][2] * p->l;
    if (hkl_out != NULL) {
        hkl_out->h = i0; hkl_out->k = i1; hkl_out->l = i2;
    }
    if (vec_out != NULL) {
        vec_out[0] = i0; vec_out[1] = i1; vec_out[2] = i2;
    }
}


static float mabs(float a[3]) {
    return sqrtf(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
}


static void mdiv(float a[3], float n) {
    a[0] /= n; a[1] /= n; a[2] /= n;
}


static void mdiff(float in1[3], float in2[3], float out[3]) {
    out[0] = in1[1] * in2[2] - in1[2] * in2[1];
    out[1] = in1[2] * in2[0] - in1[0] * in2[2];
    out[2] = in1[0] * in2[1] - in1[1] * in2[0];
}


static void calc_g(geometry *geo) {
    float a[3], b[3], c[3];
    t_hkl t_kc;

    cvect(geo->mtx->b, &geo->slice->p0, a, NULL);
    cvect(geo->mtx->b, &geo->slice->p1, b, NULL);
    mdiv(a, mabs(a));
    mdiff(a, b, c);
    mdiv(c, mabs(c));
    mdiff(c, a, b);
    geo->mtx->g[0][0] = a[0]; geo->mtx->g[0][1] = a[1]; geo->mtx->g[0][2] = a[2];
    geo->mtx->g[1][0] = b[0]; geo->mtx->g[1][1] = b[1]; geo->mtx->g[1][2] = b[2];
    geo->mtx->g[2][0] = c[0]; geo->mtx->g[2][1] = c[1]; geo->mtx->g[2][2] = c[2];
    cvect(geo->mtx->b, &geo->slice->pc, NULL, &t_kc);
    cvect(geo->mtx->g, &t_kc, NULL, &geo->slice->pc);
}


static void calc_uu(geometry *geo) {
    size_t i, j, t;

    for (i=0; i<3; ++i)
        for (j=0; j<3; ++j) {
            geo->mtx->uu[i][j] = 0;
            for (t=0; t<3; ++t)
                geo->mtx->uu[i][j] += geo->mtx->g[i][t] * geo->mtx->u[j][t];
        }
}


static void calc_cell_matrices(geometry *geo) {
    memcpy(geo->mtx->ub, geo->par->ub, UB_BUF);
    geo->par->cell_alpha *= D2R;
    geo->par->cell_beta *= D2R;
    geo->par->cell_gamma *= D2R;
    calc_cell(geo);
    calc_b(geo);
    calc_u(geo);
    calc_g(geo);
    calc_uu(geo);
}


static void rot(float a[3][3], int index, float angle) {
    float _cos, _sin;

    memset(a, 0, UB_BUF);
    angle *= D2R;
    _cos = cosf(angle);
    _sin = sinf(angle);

    if (index == 1) {
        a[0][0] = 1.0f;
        a[1][1] = _cos;
        a[2][2] = _cos;
        a[1][2] = _sin;
        a[2][1] = -_sin;
    } else if (index == 2) {
        a[1][1] = 1.0f;
        a[0][0] = _cos;
        a[2][2] = _cos;
        a[0][2] = -_sin;
        a[2][0] = _sin;
    } else if (index == 3) {
        a[2][2] = 1.0f;
        a[1][1] = _cos;
        a[0][0] = _cos;
        a[0][1] = _sin;
        a[1][0] = -_sin;
    }
}


static void rotdet(geometry *geo, float a[3][3]) {
    float b[3][3], c[3][3];

    rot(b, 2, geo->par->d2);
    rot(c, 1, geo->par->d1);
    mmult3x3(b, c, a);
    memcpy(c, a, UB_BUF);
    rot(b, 3, geo->par->theta0);
    mmult3x3(b, c, a);
}


static void sphere_crysalis(geometry *geo) {
    size_t i;
    float itmp, jtmp, x, y, ts, px, py, pz, a[3][3], b[3][3], d2, d3, x2, y2, al;

    rotdet(geo, a);
    rot(b, 2, geo->par->b2);

    d2 = powf(geo->par->distance, 2);
    d3 = powf(geo->par->distance, 3);
    for(i=0; i<geo->s_array; ++i) {
        jtmp = floorf((float)i / (float)geo->par->inhor);
        itmp = i - geo->par->inhor * jtmp;
        itmp = geo->par->inhor - itmp - geo->par->yc;
        jtmp = geo->par->inver - jtmp - geo->par->xc;
        x = jtmp * geo->par->pixel;
        y = itmp * geo->par->pixel;
        x2 = powf(x, 2);
        y2 = powf(y, 2);
        al = d2 + x2 + y2;
        geo->lorentz[i] = powf(al, 2) * sqrtf(al) / d3 / (d2 + y2);
        px = -a[0][0] * geo->par->distance + a[0][1] * x + a[0][2] * y;
        py = -a[1][0] * geo->par->distance + a[1][1] * x + a[1][2] * y;
        pz = -a[2][0] * geo->par->distance + a[2][1] * x + a[2][2] * y;
        ts = sqrtf(px * px + py * py + pz * pz);
        geo->kxA[i] = 0.5f * (px / ts + b[0][0]) / geo->par->wavelength;
        geo->kyA[i] = 0.5f * (py / ts + b[1][0]) / geo->par->wavelength;
        geo->kzA[i] = 0.5f * (pz / ts + b[2][0]) / geo->par->wavelength;
    }
}


void ccp4_add_array(geometry *geo, int32_t *array, float angle, float osc) {
    size_t i, j, k, l, m, t;
    int32_t nx, ny, nz;
    float intensity, kx, ky, kz, a[3][3], b[3][3];

    for(t=0; t<geo->slice->downsample; ++t) {
        rot(a, 3, angle + osc * (t + 0.5f) / geo->slice->downsample);
        for (i=0; i<3; ++i) {
            for (j=0; j<3; ++j) {
                b[i][j] = 0;
                for (k=0; k<3; ++k)
                    b[i][j] += geo->mtx->uu[i][k] * a[j][k];
            }
        }
        for(i=0; i<geo->s_array; ++i) {
            kx = geo->kxA[i] * b[0][0] + geo->kyA[i] * b[0][1] + geo->kzA[i] * b[0][2] - geo->slice->pc.h;
            ky = geo->kxA[i] * b[1][0] + geo->kyA[i] * b[1][1] + geo->kzA[i] * b[1][2] - geo->slice->pc.k;
            kz = geo->kxA[i] * b[2][0] + geo->kyA[i] * b[2][1] + geo->kzA[i] * b[2][2] - geo->slice->pc.l;

            intensity = (float)array[i];
            if (intensity < 0)
                continue;
            if (geo->slice->lorentz)
                intensity *= geo->lorentz[i];
            if (geo->type == LAYER_3D) {
                nx = (int32_t)floorf(geo->slice->x * kx / (2 * geo->slice->dQ)) + geo->slice->x / 2;
                ny = (int32_t)floorf(geo->slice->y * ky / (2 * geo->slice->dQ)) + geo->slice->y / 2;
                nz = (int32_t)floorf(geo->slice->z * kz / (2 * geo->slice->dQ)) + geo->slice->z / 2;
                if (nx >= 0 && ny >= 0 && nz >= 0 && nx < geo->slice->x && ny < geo->slice->y  && nz < geo->slice->z) {
                    l = (size_t)(nx * geo->slice->y * geo->slice->z + ny * geo->slice->z + nz);
                    geo->voxval[l] += intensity;
                    geo->voxcount[l]++;
                }
            } else if (geo->type == LAYER_2D) {
                if (kx >= -geo->slice->qmax      && kx < geo->slice->qmax   &&
                    ky >= -geo->slice->qmax      && ky < geo->slice->qmax   &&
                    kz >= -geo->slice->thickness && kz < geo->slice->thickness) {
                    l = (size_t)(floorf((kx / geo->slice->qmax + 1.0f) * geo->ss_voxels / 2));
                    m = (size_t)(floorf((ky / geo->slice->qmax + 1.0f) * geo->ss_voxels / 2));
                    k = geo->ss_voxels * l + m;
                    geo->voxval[k] += intensity;
                    geo->voxcount[k]++;
                }
            } else {
                return;
            }
        }
    }
}


static void ccp4_header(geometry *geo) {
    geo->ccp4_hdr->nc = geo->slice->x;
    geo->ccp4_hdr->nr = geo->slice->y;
    geo->ccp4_hdr->ns = geo->slice->z;
    geo->ccp4_hdr->mode = 2;
    geo->ccp4_hdr->nx = geo->slice->x;
    geo->ccp4_hdr->ny = geo->slice->y;
    geo->ccp4_hdr->nz = geo->slice->z;
    geo->ccp4_hdr->xlen = S;
    geo->ccp4_hdr->ylen = S;
    geo->ccp4_hdr->zlen = S;
    geo->ccp4_hdr->alpha = ALPHA;
    geo->ccp4_hdr->beta = ALPHA;
    geo->ccp4_hdr->gamma = ALPHA;
    geo->ccp4_hdr->mapc = 1;
    geo->ccp4_hdr->mapr = 2;
    geo->ccp4_hdr->maps = 3;
}


static void destroy_aux(geometry *geo) {
    if (geo != NULL) {
        if (geo->lorentz != NULL) {
            free(geo->lorentz);
            geo->lorentz = NULL;
        }
        if (geo->voxval != NULL) {
            free(geo->voxval);
            geo->voxval = NULL;
        }
        if (geo->voxcount != NULL) {
            free(geo->voxcount);
            geo->voxcount = NULL;
        }
    }
}


void ccp4_map(geometry *geo) {
    size_t i, j, k, l;
    float avg;

    if (geo->map_calculated)
        return;

    if (geo->type == LAYER_3D) {
        for(i=0; i<geo->slice->x; ++i)
            for(j=0; j<geo->slice->y; ++j)
                for(k=0; k<geo->slice->z; ++k) {
                    l = i * geo->slice->y * geo->slice->z + j * geo->slice->z + k;
                    if (geo->voxval[l] > 0 && geo->voxcount[l] > 0) {
                        avg = geo->voxval[l] / geo->voxcount[l];
                        geo->voxels[l] = (avg < 0xFFFFFF) ? avg : 0;
                    }
                }
    } else if (geo->type == LAYER_2D) {
        for (i=0; i<geo->s_voxels; i++) {
            if (geo->voxcount[i] > 0) {
                geo->voxels[i] = geo->voxval[i] / geo->voxcount[i] * geo->slice->scale;
            } else {
                geo->voxels[i] = 0;
            }
        }
    }
    geo->map_calculated = 1;
    destroy_aux(geo);
}


void _destroy_ccp4(geometry *geo) {
    destroy_aux(geo);
    if (geo != NULL) {
        if (geo->ccp4_hdr != NULL)
            free(geo->ccp4_hdr);
        free(geo);
    }
}


geometry *_init_ccp4(parfile *par, t_slice *slice, int type) {
    geometry *geo;
    char *mem;

    mem = malloc(sizeof(geometry) + sizeof(cell_matrices));
    if (mem == NULL)
        return NULL;
    geo = (geometry *)mem;
    geo->mtx = (cell_matrices *)(geo + 1);
    geo->par = par;
    geo->slice = slice;
    geo->lorentz = NULL;
    geo->voxval = NULL;
    geo->voxcount = NULL;
    geo->ccp4_hdr = NULL;
    geo->voxels = NULL;
    geo->map_calculated = 0;
    geo->type = type;
    geo->s_array = geo->par->inhor * geo->par->inver;
    geo->s_buf = geo->s_array * sizeof(float);
    if (geo->type == LAYER_3D) {
        geo->s_voxels = slice->x * slice->y * slice->z;
    } else if (geo->type == LAYER_2D) {
        geo->ss_voxels = max(geo->par->inhor, geo->par->inver) * 2;
        geo->s_voxels = geo->ss_voxels * geo->ss_voxels;
        geo->shape[0] = (Py_ssize_t)geo->ss_voxels;
        geo->shape[1] = (Py_ssize_t)geo->ss_voxels;
        geo->strides[0] = (Py_ssize_t)(geo->ss_voxels * sizeof(float));
        geo->strides[1] = (Py_ssize_t)sizeof(float);
    } else {
        _destroy_ccp4(geo);
        return NULL;
    }

    geo->s_output = sizeof(ccp4header) + geo->s_voxels * sizeof(float);
    geo->lorentz = malloc(geo->s_buf * 4);
    geo->voxval = calloc(geo->s_voxels, sizeof(float));
    geo->voxcount = calloc(geo->s_voxels, sizeof(uint32_t));
    geo->ccp4_hdr = malloc(geo->s_output);
    if (!geo->lorentz || !geo->voxval || !geo->voxcount || !geo->ccp4_hdr) {
        _destroy_ccp4(geo);
        return NULL;
    }
    memset(geo->ccp4_hdr, 0, geo->s_output);
    geo->voxels = (float *)(geo->ccp4_hdr + 1);

    geo->kxA = geo->lorentz + geo->s_array;
    geo->kyA = geo->kxA + geo->s_array;
    geo->kzA = geo->kyA + geo->s_array;

    ccp4_header(geo);
    calc_cell_matrices(geo);
    sphere_crysalis(geo);
    return geo;
}
