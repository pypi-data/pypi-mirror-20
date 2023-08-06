//
//  heatmap.h
//  heatmap
//
//  Created by Juncheng on 5/24/16.
//  Copyright © 2016 Juncheng. All rights reserved.
//

#ifndef heatmap_h
#define heatmap_h

#include <stdio.h>
#include <stdlib.h>
#include <glib.h>
#include <unistd.h> 
#include "reader.h"
#include "glib_related.h" 
#include "cache.h" 
#include "LRUProfiler.h"
#include "Optimal.h"
#include "FIFO.h"
#include "utils.h"
#include "const.h"
#include <math.h>




typedef struct {
    /* 
     the data in matrix is stored in column based for performance consideration
     because in each computation thread, the result is stored on one column 
     think it as the x, y coordinates 
     */
    
    guint64 xlength;
    guint64 ylength;
    double** matrix;
    
}draw_dict;


struct multithreading_params_heatmap{
    reader_t* reader;
    struct cache* cache;
    int order;
    GArray* break_points;
    draw_dict* dd;
    guint64* progress;
    GMutex mtx;
    double log_base;
};


void free_draw_dict(draw_dict* dd);




GSList* get_last_access_dist_seq(reader_t* reader,
                                 void (*funcPtr)(reader_t*, cache_line*));

draw_dict* heatmap(reader_t* reader, struct_cache* cache, char mode,
                   gint64 time_interval, gint64 num_of_pixels,
                   int plot_type, int num_of_threads);
draw_dict* differential_heatmap(reader_t* reader, struct_cache* cache1,
                                struct_cache* cache2, char mode,
                                gint64 time_interval, gint64 num_of_pixels,
                                int plot_type, int num_of_threads);
draw_dict* heatmap_rd_distribution(reader_t* reader, char mode,
                                   int num_of_threads, int CDF);


GArray* gen_breakpoints_virtualtime(reader_t* reader, gint64 time_interval,
                                    gint64 num_of_pixels);
GArray* gen_breakpoints_realtime(reader_t* reader, gint64 time_interval,
                                 gint64 num_of_pixels);



/* heatmap_thread */
void heatmap_LRU_hit_rate_start_time_end_time_thread(gpointer data,
                                                     gpointer user_data);
void heatmap_nonLRU_hit_rate_start_time_end_time_thread(gpointer data,
                                                        gpointer user_data);
void heatmap_rd_distribution_thread(gpointer data, gpointer user_data);
void heatmap_rd_distribution_CDF_thread(gpointer data, gpointer user_data);



#endif /* heatmap_h */
