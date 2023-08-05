#include <stdlib.h>
#include <stdint.h>
#include "./base.h"
#include <stdio.h>

typedef struct Tuple Tuple;
typedef struct TupleItem TupleItem;

struct Tuple {
    size_t num;
    TupleItem *items;
};

struct TupleItem {
    uint8_t type;
    unsigned char *buffer;
    size_t buff_size;
    union {
        Tuple tuple;
        char *string;
        unsigned char *buffer;
        int8_t char_;
        uint8_t uchar;
        int16_t int16;
        uint16_t uint16;
        int32_t int32;
        uint32_t uint32;
        int64_t int64;
        uint64_t uint64;
    } typed;
};

static Tuple constructTupleOfSize(size_t i)    {
    Tuple ret;
    ret.num = i;
    ret.items = (TupleItem *) calloc(i, sizeof(TupleItem));
    while (i--) {
        ret.items[i].type = -1;
        ret.items[i].buffer = NULL;
        ret.items[i].buff_size = 0;
    }
    return ret;
}

static char resizeTuple(Tuple t, size_t i) {
    TupleItem *temp_items;
    temp_items = realloc(t.items, sizeof(TupleItem) * i);
    if (temp_items == NULL) {
        return -1;
    }
    else    {
        t.num = i;
        t.items = temp_items;
        return 0;
    }
}

static char tupleAddTupleAt(Tuple t, size_t i, size_t size)    {
    if (i >= t.num && t.items[i].type == -1) {
        return -1;
    }
    else    {
        t.items[i].type = 0x3B;
        t.items[i].typed.tuple = constructTupleOfSize(size);
        return 1;
    }
}

static char tupleAddInt64At(Tuple t, size_t i, int64_t val)    {
    if (i >= t.num && t.items[i].type == -1) {
        return -1;
    }
    else    {
        t.items[i].type = 0x3A;
        t.items[i].typed.int64 = val;
        return 1;
    }
}

static char tupleAddUint64At(Tuple t, size_t i, uint64_t val)    {
    if (i >= t.num && t.items[i].type == -1) {
        return -1;
    }
    else    {
        t.items[i].type = 0x39;
        t.items[i].typed.uint64 = val;
        return 1;
    }
}

static char tupleAddInt32At(Tuple t, size_t i, int32_t val)    {
    if (i >= t.num && t.items[i].type == -1) {
        return -1;
    }
    else    {
        t.items[i].type = 0x38;
        t.items[i].typed.int32 = val;
        return 1;
    }
}

static char tupleAddUint32At(Tuple t, size_t i, uint32_t val)    {
    if (i >= t.num && t.items[i].type == -1) {
        return -1;
    }
    else    {
        t.items[i].type = 0x37;
        t.items[i].typed.uint32 = val;
        return 1;
    }
}

static char tupleAddInt16At(Tuple t, size_t i, int16_t val)    {
    if (i >= t.num && t.items[i].type == -1) {
        return -1;
    }
    else    {
        t.items[i].type = 0x36;
        t.items[i].typed.int16 = val;
        return 1;
    }
}

static char tupleAddUint16At(Tuple t, size_t i, uint16_t val)    {
    if (i >= t.num && t.items[i].type == -1) {
        return -1;
    }
    else    {
        t.items[i].type = 0x35;
        t.items[i].typed.uint16 = val;
        return 1;
    }
}

static char tupleAddCharAt(Tuple t, size_t i, int8_t val)  {
    if (i >= t.num && t.items[i].type == -1) {
        return -1;
    }
    else    {
        t.items[i].type = 0x34;
        t.items[i].typed.char_ = val;
        return 1;
    }
}

static char tupleAddUcharAt(Tuple t, size_t i, uint8_t val)    {
    if (i >= t.num && t.items[i].type == -1) {
        return -1;
    }
    else    {
        t.items[i].type = 0x33;
        t.items[i].typed.uchar = val;
        return 1;
    }
}

static char tupleAddBufferAt(Tuple t, size_t i, const unsigned char *val, const size_t len)    {
    if (i >= t.num && t.items[i].type == -1) {
        return -1;
    }
    else    {
        t.items[i].type = 0x30;
        t.items[i].buffer = (unsigned char *) calloc(len, sizeof(unsigned char));
        memcpy(t.items[i].buffer, val, len);
        t.items[i].buff_size = len;
        t.items[i].typed.buffer = t.items[i].buffer;
        return 1;
    }
}

static char tupleAddStringAt(Tuple t, size_t i, const char *val, const size_t len)    {
    if (i >= t.num && t.items[i].type == -1) {
        return -1;
    }
    else    {
        t.items[i].type = 0x31;
        t.items[i].buffer = (char *) calloc(len, sizeof(char));
        memcpy(t.items[i].buffer, val, len);
        t.items[i].buff_size = len;
        t.items[i].typed.string = t.items[i].buffer;
        return 1;
    }
}

static inline char is_tuple_item_char(TupleItem item)   {
    return (item.type == 0x34);
}

static inline char is_tuple_item_uchar(TupleItem item)  {
    return (item.type == 0x33);
}

static inline char is_tuple_item_int16(TupleItem item)  {
    return (item.type == 0x36);
}

static inline char is_tuple_item_uint16(TupleItem item) {
    return (item.type == 0x35);
}

static inline char is_tuple_item_int32(TupleItem item)  {
    return (item.type == 0x38);
}

static inline char is_tuple_item_uint32(TupleItem item) {
    return (item.type == 0x37);
}

static inline char is_tuple_item_int64(TupleItem item)  {
    return (item.type == 0x3A);
}

static inline char is_tuple_item_uint64(TupleItem item) {
    return (item.type == 0x39);
}

static inline char tuple_item_fits_in_char(TupleItem item)   {
    return is_tuple_item_char(item);
}

static inline char tuple_item_fits_in_uchar(TupleItem item)  {
    return is_tuple_item_uchar(item);
}

static inline char tuple_item_fits_in_int16(TupleItem item)  {
    return is_tuple_item_int16(item) || tuple_item_fits_in_char(item) ||
            tuple_item_fits_in_uchar(item);
}

static inline char tuple_item_fits_in_uint16(TupleItem item) {
    return is_tuple_item_uint16(item) || tuple_item_fits_in_uchar(item);
}

static inline char tuple_item_fits_in_int32(TupleItem item)  {
    return is_tuple_item_int32(item) || is_tuple_item_uint16(item) ||
            tuple_item_fits_in_int16(item);
}

static inline char tuple_item_fits_in_uint32(TupleItem item) {
    return is_tuple_item_uint32(item) || tuple_item_fits_in_uint16(item);
}

static inline char tuple_item_fits_in_int64(TupleItem item)  {
    return is_tuple_item_int64(item) || is_tuple_item_uint32(item) ||
            tuple_item_fits_in_int32(item);
}

static inline char tuple_item_fits_in_uint64(TupleItem item) {
    return is_tuple_item_uint64(item) || tuple_item_fits_in_uint32(item);
}

static inline char is_tuple_item_tuple(TupleItem item)  {
    return (item.type == 0x3B);
}

static inline char is_tuple_item_buffer(TupleItem item) {
    return (item.type == 0x30);
}

static inline char is_tuple_item_string(TupleItem item) {
    return (item.type == 0x31);
}

static inline char is_tuple_item_big_integer(TupleItem item)    {
    return (item.type == 0x32);
}

void destroyTuple(Tuple t);

static void destroyTupleItem(TupleItem t)  {
    if (t.buffer != NULL)   {
        free(t.buffer);
    }
    if (is_tuple_item_tuple(t)) {
        destroyTuple(t.typed.tuple);
    }
    else if (is_tuple_item_buffer(t))   {
        free(t.typed.buffer);
    }
    else if (is_tuple_item_string(t))   {
        free(t.typed.string);
    }
    else if (is_tuple_item_big_integer(t))  {
        perror("This should not be included yet");
    }
}

void destroyTuple(Tuple t)  {
    size_t i;
    for (; i < t.num; ++i)  {
        destroyTupleItem(t.items[i]);
    }
    free(t.items);
    t.num = 0;
}

int main(int argc, char *argv[])    {
    size_t i = 0;
    Tuple tup = constructTupleOfSize(3);
    tupleAddBufferAt(tup, 0, "This is a test", 14);
    tupleAddTupleAt(tup, 1, 3);
    tupleAddUcharAt(tup, 2, 0x11);
    tup.items[2].buffer = "\x00\x00\x00\x01\x33\x11";
    tup.items[2].buff_size = 6;
    for (; i < 3; ++i)  {
        printf("\nItem %i\n", i);
        printf("Is item a string? %i\n", is_tuple_item_string(tup.items[i]));
        printf("Is item a buffer? %i\n", is_tuple_item_buffer(tup.items[i]));
        printf("Is item a tuple? %i\n", is_tuple_item_tuple(tup.items[i]));
        printf("Is item a big-integer? %i\n", is_tuple_item_big_integer(tup.items[i]));
        printf("\nInteger identities\n");
        printf("Is item a char? %i\n", is_tuple_item_char(tup.items[i]));
        printf("Is item a uchar? %i\n", is_tuple_item_uchar(tup.items[i]));
        printf("Is item a int16? %i\n", is_tuple_item_int16(tup.items[i]));
        printf("Is item a uint16? %i\n", is_tuple_item_uint16(tup.items[i]));
        printf("Is item a int32? %i\n", is_tuple_item_int32(tup.items[i]));
        printf("Is item a uint32? %i\n", is_tuple_item_uint32(tup.items[i]));
        printf("Is item a int64? %i\n", is_tuple_item_int64(tup.items[i]));
        printf("Is item a uint64? %i\n", is_tuple_item_uint64(tup.items[i]));
        printf("\nInteger fittings\n");
        printf("Does item fit in a char? %i\n", tuple_item_fits_in_char(tup.items[i]));
        printf("Does item fit in a uchar? %i\n", tuple_item_fits_in_uchar(tup.items[i]));
        printf("Does item fit in a int16? %i\n", tuple_item_fits_in_int16(tup.items[i]));
        printf("Does item fit in a uint16? %i\n", tuple_item_fits_in_uint16(tup.items[i]));
        printf("Does item fit in a int32? %i\n", tuple_item_fits_in_int32(tup.items[i]));
        printf("Does item fit in a uint32? %i\n", tuple_item_fits_in_uint32(tup.items[i]));
        printf("Does item fit in a int64? %i\n", tuple_item_fits_in_int64(tup.items[i]));
        printf("Does item fit in a uint64? %i\n", tuple_item_fits_in_uint64(tup.items[i]));
    }
    destroyTuple(tup);
}