#include<stdio.h>

void func(int i){
i++;
printf("%d\n",i);
return func(i);
}

void main()
{
int i=0;  
func(i);
}
