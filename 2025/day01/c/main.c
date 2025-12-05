#include <stdio.h>
#include <stdlib.h>

int main(){
  FILE *fp = fopen("../input.txt", "r");
  if (fp == NULL){
    printf("Error: Could not open ../input.txt\n");
   return 1;
  }

  printf("--- C Output ---\n");

  char buffer[1024];

  while(fgets(buffer, sizeof(buffer), fp) != NULL){
    printf("%s", buffer);
  }

  printf("\n--- End of C Output ---\n");
  fclose(fp);
  return 0;
}
