#include <ros/ros.h>
#include <math.h>

int main(int argc, char **argv)
{
  float f = std::atan(10); // f SHOULD GET RADIANS
  float x = f * f;
}
