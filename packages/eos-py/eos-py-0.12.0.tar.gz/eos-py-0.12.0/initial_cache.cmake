# Mechanism via FindLIB.cmake
# ==============================
# Boost:
# -------
# Windows: Download the pre-built binaries from http://sourceforge.net/projects/boost/files/boost-binaries/ for VS2013 (msvc-12 64bit).
# Set the windows PATH variable to "<YOUR_BOOST_DIRECTORY>\lib64-msvc-12.0" and CMake will find it.
set(BOOST_ROOT     "D:/boost/boost_1_59_0"    CACHE STRING "Boost search location" FORCE)
# Linux: Boost can usually be installed via a package manager (e.g. apt-get install boost-all-dev) and this variable can be left uncommented.
#set(BOOST_ROOT     "/home/user/boost/install"    CACHE STRING "Boost search location" FORCE)

# Eigen3:
# -------
# Windows: Set to the path of the unzipped Eigen3 file.
#set(EIGEN3_INCLUDE_DIR "D:\\eigen\\eigen-3.3.3" CACHE STRING "Directory of the Eigen3 headers" FORCE)
# Linux: Can be left empty when installed system-wide. (Note/Todo: Doesnt work with Eigen 3.0.5 from Ubuntu 12.04). Otherwise, set the path manually.
#set(EIGEN3_INCLUDE_DIR "/home/user/eigen-10219c95fe65/" CACHE STRING "Directory of the Eigen3 headers" FORCE)


# Mechanism via ConfigLIB.cmake in 3rd party library directory
# ==============================
# OpenCV:
# -------
# Windows: Download the package from opencv.org, use 2.4.7.2 or never. It includes binaries for VS2013. Set this path accordingly.
set(OpenCV_DIR   "D:\\opencv\\opencv-2.4.12-github\\install"   CACHE STRING "OpenCV config dir, where OpenCVConfig.cmake can be found" FORCE)
# Linux: Usually can be left blank but it can be used if OpenCV is not found.
#set(OpenCV_DIR   "/home/user/opencv/install/share/OpenCV"   CACHE STRING "OpenCV config dir, where OpenCVConfig.cmake can be found" FORCE)

set(Ceres_DIR "C:\\ceres\\install-vs2015\\CMake" CACHE PATH "Location of CeresConfig.cmake" FORCE)

# Configuration options
# ==============================
set(BUILD_EXAMPLES ON CACHE BOOL "Build the example applications." FORCE)
set(BUILD_CERES_EXAMPLE ON CACHE BOOL "Build the fit-model-ceres example (requires Ceres)." FORCE)
set(BUILD_UTILS ON CACHE BOOL "Build utility applications." FORCE)
set(BUILD_DOCUMENTATION OFF CACHE BOOL "Build the library documentation." FORCE)
