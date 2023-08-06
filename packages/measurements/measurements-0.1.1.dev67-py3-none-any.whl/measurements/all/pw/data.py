import measurements.dop.pw.data
import measurements.po4.wod.data
import measurements.universal.data
import measurements.universal.constants
import measurements.land_sea_mask.lsm


def all_measurements(max_box_distance_to_water=None, min_measurements_correlation=None, tracers=None):
    if min_measurements_correlation is None:
        min_measurements_correlation = measurements.universal.constants.CORRELATION_MIN_MEASUREMENTS
    
    measurements_collection = []
    
    if max_box_distance_to_water is None or max_box_distance_to_water == float('inf'):
        if tracers is None or 'po4' in tracers:
            measurements_collection.append(measurements.po4.wod.data.Measurements(min_measurements_correlation=min_measurements_correlation))
        if tracers is None or 'dop' in tracers:
            measurements_collection.append(measurements.dop.pw.data.Measurements(min_measurements_correlation=min_measurements_correlation))
    else:
        water_lsm = measurements.land_sea_mask.lsm.LandSeaMaskTMM()
        if tracers is None or 'po4' in tracers:
            measurements_collection.append(measurements.po4.wod.data.MeasurementsNearWater(min_measurements_correlation=min_measurements_correlation, water_lsm=water_lsm, max_box_distance_to_water=max_box_distance_to_water))
        if tracers is None or 'dop' in tracers:
            measurements_collection.append(measurements.dop.pw.data.MeasurementsNearWater(min_measurements_correlation=min_measurements_correlation, water_lsm=water_lsm, max_box_distance_to_water=max_box_distance_to_water))
    
    measurements_collection = measurements.universal.data.MeasurementsCollectionCache(*measurements_collection)
    return measurements_collection
