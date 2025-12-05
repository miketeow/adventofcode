CC = gcc
CFLAGS = -Wall -O2
TARGET = main

# 1. Change the default target to 'run'
all: run

$(TARGET): main.c
	$(CC) $(CFLAGS) -o $(TARGET) main.c

# 2. The run target
run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)
