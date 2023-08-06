
#ifndef CRYMON_CCP4_H_   /* Include guard */
#define CRYMON_CCP4_H_ 1

#include <stdlib.h>
#include <stdint.h>
#include <Python.h>


typedef struct {
    float distance;
    float wavelength;
    float alpha;
    float beta;
    float xc;
    float yc;
    float ub[3 * 3];
    float d1;
    float d2;
    float d3;
    float cell_a;
    float cell_b;
    float cell_c;
    float cell_alpha;
    float cell_beta;
    float cell_gamma;
    float b2;
    float omega0;
    float theta0;
    float kappa0;
    float phi0;
    float pixel;
    int inhor;
    int inver;
} parfile;

typedef struct {
    float b[3][3];
    float cell[3][3];
    float ub[3][3];
    float u[3][3];
    float g[3][3];
    float uu[3][3];
} cell_matrices;

#define CCP4_ZEROS_HEADER_SIZE 237

typedef struct {          // http://www.ccp4.ac.uk/html/maplib.html#description
    int32_t nc;
    int32_t nr;
    int32_t ns;
    int32_t mode;
    int32_t ncstart;
    int32_t nrstart;
    int32_t nsstart;
    int32_t nx;
    int32_t ny;
    int32_t nz;
    float xlen;
    float ylen;
    float zlen;
    float alpha;
    float beta;
    float gamma;
    int32_t mapc;
    int32_t mapr;
    int32_t maps;
    int32_t zeros[CCP4_ZEROS_HEADER_SIZE];
} ccp4header;

typedef struct {
    float h;
    float k;
    float l;
} t_hkl;

typedef struct {
    t_hkl p0;
    t_hkl p1;
    t_hkl pc;
    float thickness;
    float qmax;
    float dQ;
    uint32_t downsample;
    uint32_t x;
    uint32_t y;
    uint32_t z;
    uint32_t lorentz;
    uint32_t scale;
} t_slice;

#define LAYER_3D 0
#define LAYER_2D 1

typedef struct {
    parfile *par;
    cell_matrices *mtx;
    size_t s_array;
    size_t s_buf;
    Py_ssize_t s_output;
    float *lorentz;
    float *kxA;
    float *kyA;
    float *kzA;
    float *voxval;
    uint32_t *voxcount;
    float *voxels;
    size_t s_voxels;
    ccp4header *ccp4_hdr;
    int map_calculated;
    t_slice *slice;
    int type;
    Py_ssize_t shape[2];
    Py_ssize_t strides[2];
    size_t ss_voxels;
} geometry;

void _destroy_ccp4(geometry *geo);
geometry *_init_ccp4(parfile *par, t_slice  *slice, int type);
void ccp4_add_array(geometry *geo, int32_t *array, float angle, float osc);
void ccp4_map(geometry *geo);
#endif
