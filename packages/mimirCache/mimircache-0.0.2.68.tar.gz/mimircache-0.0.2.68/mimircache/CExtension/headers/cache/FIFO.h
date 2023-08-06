//
//  FIFO.h
//  mimircache
//
//  Created by Juncheng on 6/2/16.
//  Copyright © 2016 Juncheng. All rights reserved.
//

#ifndef fifo_h
#define fifo_h


#include "cache.h" 

/* need add support for p and c type of data 
 
 */



struct FIFO_params{
    GHashTable *hashtable;
    GQueue *list;
};




extern gboolean fifo_check_element(struct_cache* cache, cache_line* cp);
extern gboolean fifo_add_element(struct_cache* cache, cache_line* cp);

extern void     __fifo_insert_element(struct_cache* fifo, cache_line* cp);
extern void     __fifo_update_element(struct_cache* fifo, cache_line* cp);
extern void     __fifo_evict_element(struct_cache* fifo, cache_line* cp);
extern void*    __fifo__evict_with_return(struct_cache* fifo, cache_line* cp);


extern void     fifo_destroy(struct_cache* cache);
extern void     fifo_destroy_unique(struct_cache* cache);
extern uint64_t fifo_get_size(struct_cache *cache);


struct_cache* fifo_init(guint64 size, char data_type, void* params);



#endif
