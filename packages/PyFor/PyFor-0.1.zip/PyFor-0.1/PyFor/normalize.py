import pandas as pd
import numpy as np

def elev_points(tiff, cloud):
    """Normalizes a point cloud.

    Keyword arguments:
    tiff -- A GeoTIFF with extent that covers all considered LiDAR points, must match projections.
    cloud -- A CloudInfo object (from pointcloud.py).
    """
    #TODO: Match tiff and cloud projections.
    import gdal
    import affine

    print("Normalizing points.")

    xy_array = cloud.dataframe.as_matrix(columns=['x', 'y'])

    # Retrieving tiff information & transformation.
    raster_object = gdal.Open(tiff)
    raster_array = np.array(raster_object.GetRasterBand(1).ReadAsArray())
    geo_trans = raster_object.GetGeoTransform()
    forward_transform = affine.Affine.from_gdal(*geo_trans)
    reverse_transform = ~forward_transform

    def retrieve_pixel_value(coord_array):
        """Returns an array of pixel values underneath each LiDAR point."""
        x_coords, y_coords = xy_array[:, 0], xy_array[:, 1]
        pixel_x, pixel_y = reverse_transform * (x_coords, y_coords)
        pixel_x, pixel_y = pixel_x + 0.5, pixel_y + 0.5
        pixel_x, pixel_y = pixel_x.astype(int), pixel_y.astype(int)
        return raster_array[pixel_x, pixel_y]


    cloud.dataframe['elev'] = retrieve_pixel_value(xy_array)
    cloud.dataframe['norm'] = cloud.dataframe['z'] - cloud.dataframe['elev']

    # Some cleaning processes.
    cloud.dataframe.dropna(inplace=True)
    cloud.dataframe = cloud.dataframe[cloud.dataframe.elev != 0]


def df_to_las(df, out_path, header, zcol='z'):
    """Exports normalized points to new las.

    Keyword arguments:
    df -- A dataframe of las information to write from.
    out_path -- The location and name of the output file.
    header -- The header object to write to the output file.
    zcol -- The elevation (z) information to be written to the file.
    """
    import laspy

    outfile = laspy.file.File(out_path, mode="w", header = header)
    outfile.x = df['x']
    outfile.y = df['y']
    outfile.z = df[zcol]
    outfile.intensity = df['int']
    #TODO: Fix, currently not working
    #outfile.return_num = df['ret']
