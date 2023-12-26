export function extract(number,from, size) {
    console.log(number>>from)
    console.log(((1<<(size+1))-1))
    return ((number>>from) &((1<<(size))-1))
}