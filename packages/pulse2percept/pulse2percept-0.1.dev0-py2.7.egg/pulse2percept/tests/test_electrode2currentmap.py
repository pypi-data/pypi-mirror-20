import numpy as np
import numpy.testing as npt
import pytest

import pulse2percept.electrode2currentmap as e2cm


def test_Electrode():
    num_pts = 10
    r = np.linspace(1, 1000, num_pts)
    x = np.linspace(-1000, 1000, num_pts)
    y = np.linspace(-2000, 2000, num_pts)
    h = np.linspace(0, 1000, num_pts)
    t = ['subretinal', 'epiretinal'] * (num_pts // 2)
    n = ["some name"] * num_pts

    for rr, xx, yy, hh, tt, nn in zip(r, x, y, h, t, n):
        e = e2cm.Electrode(tt, rr, xx, yy, hh, nn)
        npt.assert_equal(e.radius, rr)
        npt.assert_equal(e.x_center, xx)
        npt.assert_equal(e.y_center, yy)
        # npt.assert_equal(e.h, hh)
        npt.assert_equal(e.etype, tt)
        npt.assert_equal(e.name, nn)
        if tt.lower() == 'epiretinal':
            # `height` property should return `h_nfl`
            npt.assert_equal(e.height, e.h_nfl)

            # `h_nfl` should be the same as the user-specified height
            npt.assert_equal(e.height, hh)

            # `h_inl` should be further away from the array
            npt.assert_equal(e.h_inl > hh, True)
        else:
            # `height` property should return `h_inl`
            npt.assert_equal(e.height, e.h_inl)

            # Subretinal arrays have layer thicknesses added to `hh`.
            npt.assert_equal(e.height > hh, True)


def test_ElectrodeArray():
    # Make sure ElectrodeArray can accept ints, floats, lists, np.arrays
    implants = [None] * 4
    implants[0] = e2cm.ElectrodeArray('epiretinal', [0], [1], [2], [3])
    implants[1] = e2cm.ElectrodeArray('epiretinal', 0, 1, 2, 3)
    implants[2] = e2cm.ElectrodeArray('epiretinal', .0, [1], 2.0, [3])
    implants[3] = e2cm.ElectrodeArray('epiretinal', np.array([0]), [1], [2],
                                      [[3]])
    for arr in implants:
        npt.assert_equal(arr.electrodes[0].radius, 0)
        npt.assert_equal(arr.electrodes[0].x_center, 1)
        npt.assert_equal(arr.electrodes[0].y_center, 2)
        npt.assert_equal(arr.electrodes[0].h_nfl, 3)
        npt.assert_equal(arr.electrodes[0].etype, 'epiretinal')

    # However, all input arguments must have the same number of elements
    with pytest.raises(AssertionError):
        e2cm.ElectrodeArray('epiretinal', [0], [1, 2], [3, 4, 5], [6])

    # Make sure electrodes can be addressed by index
    vals = range(5)
    implant = e2cm.ElectrodeArray('subretinal', vals, vals, vals, vals)
    for v in vals:
        el = implant[v]
        npt.assert_equal(el.radius, v)
        npt.assert_equal(el.x_center, v)
        npt.assert_equal(el.y_center, v)
        npt.assert_equal(el.h_inl, v + 23.0 / 2.0)
        npt.assert_equal(el.h_nfl, v + 83.0)


def test_ArgusI():
    # Create an ArgusI and make sure location is correct
    for htype in ['float', 'list']:
        for x in [0, -100, 200]:
            for y in [0, -200, 400]:
                for r in [0, -30, 45, 60, -90]:
                    # Height `h` can either be a float or a list
                    if htype == 'float':
                        h = 100
                    else:
                        h = np.ones(16) * 20

                    # Convert rotation angle to rad
                    rot = r * np.pi / 180
                    argus = e2cm.ArgusI(x, y, h=h, rot=rot)

                    # Coordinates of first electrode
                    xy = np.array([-1200, -1200]).T

                    # Rotate
                    R = np.array([np.cos(rot), np.sin(rot),
                                  -np.sin(rot), np.cos(rot)]).reshape((2, 2))
                    xy = np.matmul(R, xy)

                    # Then off-set: Make sure first electrode is placed
                    # correctly
                    npt.assert_almost_equal(argus['A1'].x_center,
                                            xy[0] + x)
                    npt.assert_almost_equal(argus['A1'].y_center,
                                            xy[1] + y)

                    # Make sure array center is still (x,y)
                    y_center = argus['D1'].y_center + \
                        (argus['A4'].y_center - argus['D1'].y_center) / 2
                    npt.assert_almost_equal(y_center, y)
                    x_center = argus['A1'].x_center + \
                        (argus['D4'].x_center - argus['A1'].x_center) / 2
                    npt.assert_almost_equal(x_center, x)

    # `h` must have the right dimensions
    with pytest.raises(ValueError):
        e2cm.ArgusI(-100, 10, h=np.zeros(5))

    for use_legacy_names in [False, True]:
        # Indexing must work for both integers and electrode names
        argus = e2cm.ArgusI(use_legacy_names=use_legacy_names)
        for idx, electrode in enumerate(argus):
            name = electrode.name
            npt.assert_equal(electrode, argus[idx])
            npt.assert_equal(electrode, argus[name])
        npt.assert_equal(argus[16], None)
        npt.assert_equal(argus["unlikely name for an electrode"], None)

        if use_legacy_names:
            name_idx1 = 'L2'
            name_idx4 = 'L5'
        else:
            name_idx1 = 'B1'
            name_idx4 = 'A2'

        # Indexing must have the right order
        npt.assert_equal(argus.get_index(name_idx1), 1)
        npt.assert_equal(argus[name_idx1], argus[1])
        npt.assert_equal(argus.get_index(name_idx4), 4)
        npt.assert_equal(argus[name_idx4], argus[4])


def test_ArgusII():
    # Create an ArgusII and make sure location is correct
    for htype in ['float', 'list']:
        for x in [0, -100, 200]:
            for y in [0, -200, 400]:
                for r in [0, -30, 45, 60, -90]:
                    # Height `h` can either be a float or a list
                    if htype == 'float':
                        h = 100
                    else:
                        h = np.ones(60) * 20

                    # Convert rotation angle to rad
                    rot = r * np.pi / 180
                    argus = e2cm.ArgusII(x, y, h=h, rot=rot)

                    # Coordinates of first electrode
                    xy = np.array([-2362.5, -1312.5]).T

                    # Rotate
                    R = np.array([np.cos(rot), np.sin(rot),
                                  -np.sin(rot), np.cos(rot)]).reshape((2, 2))
                    xy = np.matmul(R, xy)

                    # Then off-set: Make sure first electrode is placed
                    # correctly
                    npt.assert_almost_equal(argus['A1'].x_center,
                                            xy[0] + x)
                    npt.assert_almost_equal(argus['A1'].y_center,
                                            xy[1] + y)

                    # Make sure array center is still (x,y)
                    y_center = argus['F1'].y_center + \
                        (argus['A10'].y_center - argus['F1'].y_center) / 2
                    npt.assert_almost_equal(y_center, y)
                    x_center = argus['A1'].x_center + \
                        (argus['F10'].x_center - argus['A1'].x_center) / 2
                    npt.assert_almost_equal(x_center, x)

    # `h` must have the right dimensions
    with pytest.raises(ValueError):
        e2cm.ArgusII(-100, 10, h=np.zeros(5))

    # Indexing must work for both integers and electrode names
    argus = e2cm.ArgusII()
    for idx, electrode in enumerate(argus):
        name = electrode.name
        npt.assert_equal(electrode, argus[idx])
        npt.assert_equal(electrode, argus[name])
    npt.assert_equal(argus[60], None)
    npt.assert_equal(argus["unlikely name for an electrode"], None)

    # Indexing must have the right order
    npt.assert_equal(argus.get_index('A2'), 1)
    npt.assert_equal(argus['A2'], argus[1])
    npt.assert_equal(argus.get_index('B1'), 10)
    npt.assert_equal(argus['B1'], argus[10])


def test_TimeSeries():
    data_orig = np.zeros((10, 10, 1000))
    ts1 = e2cm.TimeSeries(1, data_orig)
    resample_factor = 10
    ts1.resample(resample_factor)
    npt.assert_equal(ts1.data.shape[-1],
                     data_orig.shape[-1] / resample_factor)


def test_get_pulse():
    for pulse_type in ['cathodicfirst', 'anodicfirst']:
        for pulse_dur in [0.25 / 1000, 0.45 / 1000, 0.65 / 1000]:
            for interphase_dur in [0, 0.25 / 1000, 0.45 / 1000, 0.65 / 1000]:
                for tsample in [5e-6, 1e-5, 5e-5]:
                    # generate pulse
                    pulse = e2cm.get_pulse(pulse_dur, tsample,
                                           interphase_dur,
                                           pulse_type)

                    # predicted length
                    pulse_gap_dur = 2 * pulse_dur + interphase_dur

                    # make sure length is correct
                    npt.assert_equal(pulse.shape[-1],
                                     int(np.round(pulse_gap_dur /
                                                  tsample)))

                    # make sure amplitude is correct: negative peak,
                    # zero (in case of nonnegative interphase dur),
                    # positive peak
                    if interphase_dur > 0:
                        npt.assert_equal(np.unique(pulse),
                                         np.array([-1, 0, 1]))
                    else:
                        npt.assert_equal(np.unique(pulse),
                                         np.array([-1, 1]))

                    # make sure pulse order is correct
                    idx_min = np.where(pulse == pulse.min())
                    idx_max = np.where(pulse == pulse.max())
                    if pulse_type == 'cathodicfirst':
                        # cathodicfirst should have min first
                        npt.assert_equal(idx_min[0] < idx_max[0], True)
                    else:
                        npt.assert_equal(idx_min[0] < idx_max[0], False)


def test_image2pulsetrain():
    # Range of values
    amp_min = 2
    amp_max = 15

    # Create a standard Argus I array
    implant = e2cm.ArgusI()

    # Create a small image with 1 pixel per electrode
    img = np.zeros((4, 4))

    # An all-zero image should give us a really boring stimulation protocol
    pulses = e2cm.image2pulsetrain(img, implant, valrange=[amp_min, amp_max])
    for pt in pulses:
        npt.assert_equal(pt.data.max(), amp_min)

    # Now put some structure in the image
    img[1, 1] = img[1, 2] = img[2, 1] = img[2, 2] = 0.75

    for max_contrast, val_max in zip([True, False], [amp_max, 0.75 * amp_max]):
        pt = e2cm.image2pulsetrain(img, implant, coding='amplitude',
                                   max_contrast=max_contrast,
                                   rftype='square', rfsize=50,
                                   valrange=[amp_min, amp_max])

        # Make sure we have one pulse train per electrode
        npt.assert_equal(len(pt), implant.num_electrodes)

        # Make sure the brightest electrode has `amp_max`
        npt.assert_equal(np.round(np.max([p.data.max() for p in pt])),
                         np.round(val_max))

        # Make sure the dimmest electrode has `amp_min` as max amplitude
        npt.assert_almost_equal(np.min([np.abs(p.data).max() for p in pt]),
                                amp_min, decimal=1)


def test_Retina_Electrodes():
    sampling = 1
    xlo = -2
    xhi = 2
    ylo = -3
    yhi = 3
    retina = e2cm.Retina(xlo=xlo, xhi=xhi, ylo=ylo, yhi=yhi,
                         sampling=sampling, save_data=False)
    npt.assert_equal(retina.gridx.shape, ((yhi - ylo) / sampling + 1,
                                          (xhi - xlo) / sampling + 1))
    npt.assert_equal(retina.range_x, retina.gridx.max() - retina.gridx.min())
    npt.assert_equal(retina.range_y, retina.gridy.max() - retina.gridy.min())

    electrode1 = e2cm.Electrode('epiretinal', 1, 0, 0, 0)

    # Calculate current spread for all retinal layers
    retinal_layers = ['INL', 'NFL']
    cs = dict()
    ecs = dict()
    for layer in retinal_layers:
        cs[layer] = electrode1.current_spread(retina.gridx, retina.gridy,
                                              layer=layer)
        ecs[layer] = retina.cm2ecm(cs[layer])

    electrode_array = e2cm.ElectrodeArray('epiretinal', [1, 1], [0, 1], [0, 1],
                                          [0, 1])
    npt.assert_equal(electrode1.x_center,
                     electrode_array.electrodes[0].x_center)
    npt.assert_equal(electrode1.y_center,
                     electrode_array.electrodes[0].y_center)
    npt.assert_equal(electrode1.radius, electrode_array.electrodes[0].radius)
    ecs_list, cs_list = retina.electrode_ecs(electrode_array)
    print(ecs_list.shape)

    # Make sure cs_list has an entry for every layer
    npt.assert_equal(cs_list.shape[-2], len(retinal_layers))
    npt.assert_equal(ecs_list.shape[-2], len(retinal_layers))

    # Make sure manually generated current spreads match object
    for i, e in enumerate(retinal_layers):
        # last index: electrode, second-to-last: layer
        npt.assert_equal(cs[e], cs_list[..., i, 0])


def test_Movie2Pulsetrain():
    fps = 30.0
    amplitude_transform = 'linear'
    amp_max = 90
    freq = 20
    pulse_dur = .075 / 1000.
    interphase_dur = .075 / 1000.
    tsample = .005 / 1000.
    pulsetype = 'cathodicfirst'
    stimtype = 'pulsetrain'
    rflum = np.zeros(100)
    rflum[50] = 1
    m2pt = e2cm.Movie2Pulsetrain(rflum,
                                 fps=fps,
                                 amplitude_transform=amplitude_transform,
                                 amp_max=amp_max,
                                 freq=freq,
                                 pulse_dur=pulse_dur,
                                 interphase_dur=interphase_dur,
                                 tsample=tsample,
                                 pulsetype=pulsetype,
                                 stimtype=stimtype)
    npt.assert_equal(m2pt.shape[0], round((rflum.shape[-1] / fps) / tsample))
    npt.assert_(m2pt.data.max() < amp_max)


def test_Psycho2Pulsetrain():
    dur = 0.5
    pdur = 0.45 / 1000
    tsample = 5e-6
    ampl = 20.0
    freq = 5.0

    # First an easy one (sawtooth)...
    for scale in [1.0, 2.0, 5.0, 10.0]:
        pt = e2cm.Psycho2Pulsetrain(tsample=0.1 * scale, dur=1.0 * scale,
                                    freq=freq / scale, amp=ampl * scale,
                                    pulse_dur=0.1 * scale, interphase_dur=0,
                                    pulsetype='cathodicfirst',
                                    pulseorder='pulsefirst')
        print(pt.data)
        npt.assert_equal(np.sum(np.isclose(pt.data, ampl * scale)), freq)
        npt.assert_equal(np.sum(np.isclose(pt.data, -ampl * scale)), freq)
        npt.assert_equal(pt.data[0], -ampl * scale)
        npt.assert_equal(pt.data[-1], ampl * scale)
        npt.assert_equal(len(pt.data), 10)

    # Then some more general ones...
    # Size of array given stimulus duration
    stim_size = int(np.round(dur / tsample))

    # All empty pulse trains: Expect no division by zero errors
    for amp in [0, 20]:
        p2pt = e2cm.Psycho2Pulsetrain(freq=0, amp=ampl, dur=dur,
                                      pulse_dur=pdur,
                                      interphase_dur=pdur,
                                      tsample=tsample)
        npt.assert_equal(p2pt.data, np.zeros(stim_size))

    # Non-zero pulse trains: Expect right length, pulse order, etc.
    for freq in [8, 13.8, 20]:
        for pulsetype in ['cathodicfirst', 'anodicfirst']:
            for delay in [0, 10 / 1000]:
                for pulseorder in ['pulsefirst', 'gapfirst']:
                    p2pt = e2cm.Psycho2Pulsetrain(freq=freq,
                                                  dur=dur,
                                                  pulse_dur=pdur,
                                                  interphase_dur=pdur,
                                                  delay=delay,
                                                  tsample=tsample,
                                                  amp=ampl,
                                                  pulsetype=pulsetype,
                                                  pulseorder=pulseorder)

                    # make sure length is correct
                    npt.assert_equal(p2pt.data.size, stim_size)

                    # make sure amplitude is correct
                    npt.assert_equal(np.unique(p2pt.data),
                                     np.array([-ampl, 0, ampl]))

                    # make sure pulse type is correct
                    idx_min = np.where(p2pt.data == p2pt.data.min())
                    idx_max = np.where(p2pt.data == p2pt.data.max())
                    if pulsetype == 'cathodicfirst':
                        # cathodicfirst should have min first
                        npt.assert_equal(idx_min[0] < idx_max[0], True)
                    else:
                        npt.assert_equal(idx_min[0] < idx_max[0], False)

                    # Make sure frequency is correct
                    # Need to trim size if `freq` is not a nice number
                    envelope_size = int(np.round(1.0 / float(freq) / tsample))
                    single_pulse_dur = int(np.round(1.0 * pdur / tsample))
                    num_pulses = int(np.floor(dur * freq))  # round down
                    trim_sz = envelope_size * num_pulses
                    idx_min = np.where(p2pt.data[:trim_sz] == p2pt.data.min())
                    idx_max = np.where(p2pt.data[:trim_sz] == p2pt.data.max())
                    npt.assert_equal(idx_max[0].shape[-1],
                                     num_pulses * single_pulse_dur)
                    npt.assert_equal(idx_min[0].shape[-1],
                                     num_pulses * single_pulse_dur)

                    # make sure pulse order is correct
                    delay_dur = int(np.round(delay / tsample))
                    envelope_dur = int(np.round((1 / freq) / tsample))
                    if pulsetype == 'cathodicfirst':
                        val = p2pt.data.min()  # expect min first
                    else:
                        val = p2pt.data.max()  # expect max first
                    if pulseorder == 'pulsefirst':
                        idx0 = delay_dur  # expect pulse first, then gap
                    else:
                        idx0 = envelope_dur - 3 * single_pulse_dur
                    npt.assert_equal(p2pt.data[idx0], val)
                    npt.assert_equal(p2pt.data[idx0 + envelope_dur], val)


def test_Retina_ecm():
    sampling = 1
    xlo = -2
    xhi = 2
    ylo = -3
    yhi = 3
    retina = e2cm.Retina(xlo=xlo, xhi=xhi, ylo=ylo, yhi=yhi,
                         sampling=sampling, save_data=False)

    s1 = e2cm.Psycho2Pulsetrain(freq=20, dur=0.5, pulse_dur=.075 / 1000.,
                                interphase_dur=.075 / 1000., delay=0.,
                                tsample=.075 / 1000., amp=20,
                                pulsetype='cathodicfirst')

    electrode_array = e2cm.ElectrodeArray('epiretinal', [1, 1], [0, 1], [0, 1],
                                          [0, 1])
    ecs_list, cs_list = retina.electrode_ecs(electrode_array)
    xx = yy = 0
    ecs_vector = ecs_list[yy, xx]
    # Smoke testing, feed the same stimulus through both electrodes
    stim_data = np.array([s.data for s in [s1, s1]])
    e2cm.ecm(ecs_vector, stim_data, s1.tsample)

    fps = 30.0
    amplitude_transform = 'linear'
    amp_max = 90
    freq = 20
    pulse_dur = .075 / 1000.
    interphase_dur = .075 / 1000.
    tsample = .005 / 1000.
    pulsetype = 'cathodicfirst'
    stimtype = 'pulsetrain'
    rflum = np.zeros(100)
    rflum[50] = 1
    m2pt = e2cm.Movie2Pulsetrain(rflum,
                                 fps=fps,
                                 amplitude_transform=amplitude_transform,
                                 amp_max=amp_max,
                                 freq=freq,
                                 pulse_dur=pulse_dur,
                                 interphase_dur=interphase_dur,
                                 tsample=tsample,
                                 pulsetype=pulsetype,
                                 stimtype=stimtype)
    # Smoke testing, feed the same stimulus through both electrodes to
    # make sure the code runs
    stim_data = np.array([s.data for s in [m2pt, m2pt]])
    e2cm.ecm(ecs_vector, stim_data, m2pt.tsample)
