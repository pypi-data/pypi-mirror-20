# !usr/bin/env python
# coding=gbk
from subprocess import call
import matplotlib
import pyPdf
from scipy.io.wavfile import read, write
from tqdm import tqdm
matplotlib.use('Agg')
import pylab as pl
import pandas
import scipy.io.wavfile as wav
from pydub import AudioSegment
import subprocess
import math
import numpy
from scipy.fftpack import dct
import matplotlib.pyplot as plt
import pylab
import numpy as np
from numpy.lib import stride_tricks
import os
import wave

INFO = "author:ZHANG Xu-long\nemail:fudan0027zxl@gmail.com\nblog:zhangxulong.site\n"
SEP = os.sep
SHORT_MAX = 32767
EPSILON = 1e-8


def init_data_dir():
    currentPath = os.getcwd()
    projectName = currentPath.split(SEP)[-1]
    if_no_create_it('../data/' + projectName + '/')
    return '../data/' + projectName + '/'


def savefig(filename, figlist, log=True):
    h = 10
    n = len(figlist)
    # peek into instances
    f = figlist[0]
    if len(f.shape) == 1:
        plt.figure()
        for i, f in enumerate(figlist):
            plt.subplot(n, 1, i + 1)
            if len(f.shape) == 1:
                plt.plot(f)
                plt.xlim([0, len(f)])
    elif len(f.shape) == 2:
        Nsmp, dim = figlist[0].shape
        figsize = (h * float(Nsmp) / dim, len(figlist) * h)
        plt.figure(figsize=figsize)
        for i, f in enumerate(figlist):
            plt.subplot(n, 1, i + 1)
            if log:
                plt.imshow(np.log(f.T + EPSILON))
            else:
                plt.imshow(f.T + EPSILON)
    else:
        raise ValueError('Input dimension must < 3.')
    plt.savefig(filename)


def plotMonoWav(mono_wav_path):
    # -*- coding: utf-8 -*-

    # ��WAV�ĵ�
    f = wave.open(mono_wav_path, "rb")
    # ��ȡ��ʽ��Ϣ
    # (nchannels, sampwidth, framerate, nframes, comptype, compname)
    params = f.getparams()
    nchannels, sampwidth, framerate, nframes = params[:4]
    # print nchannels, sampwidth, framerate, nframes
    # ��ȡ��������
    str_data = f.readframes(nframes)
    f.close()
    # ����������ת��Ϊ����
    wave_data = np.fromstring(str_data, dtype=np.short)
    wave_data.shape = -1, nchannels
    wave_data = wave_data.T
    time = np.arange(0, nframes) * (1.0 / framerate)
    # ���Ʋ���
    # pl.subplot(211)
    pl.plot(time, wave_data[0])
    # pl.subplot(212)
    # pl.plot(time, wave_data[1], c="g")
    pl.xlabel("time (seconds)")
    pl.show()

    return 0


def plotDuralWav(dural_wav_path):
    # ��WAV�ĵ�
    f = wave.open(dural_wav_path, "rb")
    # ��ȡ��ʽ��Ϣ
    # (nchannels, sampwidth, framerate, nframes, comptype, compname)
    params = f.getparams()
    nchannels, sampwidth, framerate, nframes = params[:4]
    # print nchannels, sampwidth, framerate, nframes
    # ��ȡ��������
    str_data = f.readframes(nframes)
    f.close()
    # ����������ת��Ϊ����
    wave_data = np.fromstring(str_data, dtype=np.short)
    wave_data.shape = -1, nchannels
    wave_data = wave_data.T
    time = np.arange(0, nframes) * (1.0 / framerate)
    # ���Ʋ���
    pl.subplot(211)
    pl.plot(time, wave_data[0])
    pl.subplot(212)
    pl.plot(time, wave_data[1], c="g")
    pl.xlabel("time (seconds)")
    pl.show()

    return 0


def wavread(filename):
    fs, x = read(filename)
    x = x.astype(np.float) / SHORT_MAX
    return x, fs


def wavwrite(filename, fs, y):
    ymax = np.max(np.abs(y))
    if ymax < 1.0:
        y = y * SHORT_MAX
    else:
        y = (y / ymax) * SHORT_MAX
    y = y.astype(np.int16)
    write(filename, fs, y)


def print_to_check(print_list=['a', 'b']):
    for print_item in print_list:
        print(print_item)


def if_no_create_it(file_path):
    the_dir = os.path.dirname(file_path)
    if os.path.isdir(the_dir):
        pass
    else:
        os.makedirs(the_dir)


def del_the_file(file_path):
    os.remove(file_path)


def wav2MFCC(dataset_dir='../data/test/dataset', datasetName='dataset'):
    for parent, dirnames, filenames in os.walk(dataset_dir):
        for filename in filenames:
            if '.DS_Store' not in filename and '.doc' not in filename:
                file_path = os.path.join(parent, filename)
                (rate, sig) = wav.read(file_path)
                mfcc_feat = calcMFCC(sig, rate)
                mfcc_feat_path = os.path.dirname(file_path) + SEP + os.path.basename(file_path).split('.')[0] + '.mfcc'
                mfcc_feat_path = mfcc_feat_path.replace(datasetName, datasetName + '_mfcc')
                if os.path.isdir(mfcc_feat_path):
                    pass
                else:
                    os.makedirs(os.path.dirname(mfcc_feat_path))
                pandas.to_pickle(mfcc_feat, mfcc_feat_path)
    return 0


def mp32Wav(path_to_process='../data/test/dataset', datasetName='dataset', sample_rate=16000):
    count = 0
    for parent, dirnames, filenames in os.walk(path_to_process):
        for filename in filenames:
            if '.mp3' in filename or '.MP3' in filename:
                file_path = os.path.join(parent, filename)
                rate = sample_rate
                count += 1

                print 'processing...NO.%d ' % count + file_path
                file_fromat = file_path[-3:]
                out_path = os.path.dirname(file_path) + SEP + os.path.basename(file_path).split('.')[0] + '.wav'
                out_path = out_path.replace(datasetName, 'mono_wav' + str(rate / 1000.0))
                sound = AudioSegment.from_file(file_path, file_fromat)
                new = sound.set_channels(1)
                new = new.set_frame_rate(rate)
                if not os.path.exists(os.path.dirname(out_path)):
                    os.makedirs(os.path.dirname(out_path))
                new.export(out_path, 'wav')
    return 0


def mpeg2wav(mvs_dir='MV'):
    # readme mv title should not have space like that "I Love pytho.mpeg" u can change space to _
    for parent, dirnames, filenames in os.walk(mvs_dir):
        for filename in filenames:
            mv_dir = os.path.join(parent, filename)

            audio_dir = 'audio/' + os.path.splitext(mv_dir)[0] + '.wav'
            if not os.path.exists(os.path.split(audio_dir)[0]):
                os.makedirs(os.path.split(audio_dir)[0])
            command = 'ffmpeg -i ' + mv_dir + ' -ab 160k -ac 2 -ar 44100 -vn ' + audio_dir
            subprocess.call(command, shell=True)

            mono_sound_dir = 'mono/' + audio_dir
            if not os.path.exists(os.path.split(mono_sound_dir)[0]):
                os.makedirs(os.path.split(mono_sound_dir)[0])
            left_audio_dir = 'left_right/' + os.path.splitext(mono_sound_dir)[0] + '_left.wav'
            if not os.path.exists(os.path.split(left_audio_dir)[0]):
                os.makedirs(os.path.split(left_audio_dir)[0])
            right_audio_dir = 'left_right/' + os.path.splitext(mono_sound_dir)[0] + '_right.wav'
            if not os.path.exists(os.path.split(right_audio_dir)[0]):
                os.makedirs(os.path.split(right_audio_dir)[0])
            sound = AudioSegment.from_wav(audio_dir)
            mono = sound.set_channels(1)
            left, right = sound.split_to_mono()
            mono.export(mono_sound_dir, format='wav')
            left.export(left_audio_dir, format='wav')
            right.export(right_audio_dir, format='wav')
    return 0


# coding=utf-8
# ��������Ҫ���ĸ����������Ƿֱ��ǣ�
#    audio2frame:����Ƶת����֡����
#    deframesignal:��ÿһ֡��һ�����������ı任
#    spectrum_magnitude:����ÿһ֡����Ҷ�任�Ժ�ķ���
#    spectrum_power:����ÿһ֡����Ҷ�任�Ժ�Ĺ�����
#    log_spectrum_power:����ÿһ֡����Ҷ�任�Ժ�Ķ���������
#    pre_emphasis:��ԭʼ�źŽ���Ԥ���ش���



def audio2frame(signal, frame_length, frame_step, winfunc=lambda x: numpy.ones((x,))):
    '''����Ƶ�ź�ת��Ϊ֡��
	�������壺
	signal:ԭʼ��Ƶ�ͺ�
	frame_length:ÿһ֡�ĳ���(����ָ������ĳ��ȣ�������Ƶ�ʳ���ʱ����)
	frame_step:����֡�ļ����ͬ�϶��壩
	winfunc:lambda��������������һ������
    '''
    signal_length = len(signal)  # �ź��ܳ���
    frame_length = int(round(frame_length))  # ��֡֡ʱ�䳤��
    frame_step = int(round(frame_step))  # ����֮֡��Ĳ���
    if signal_length <= frame_length:  # ���źų���С��һ��֡�ĳ��ȣ���֡������Ϊ1
        frames_num = 1
    else:  # ���򣬼���֡���ܳ���
        frames_num = 1 + int(math.ceil((1.0 * signal_length - frame_length) / frame_step))
    pad_length = int((frames_num - 1) * frame_step + frame_length)  # ����֡�������ܵ���ƽ��ĳ���
    zeros = numpy.zeros((pad_length - signal_length,))  # �����ĳ���ʹ��0���������FFT�е������������
    pad_signal = numpy.concatenate((signal, zeros))  # �����źż�Ϊpad_signal
    indices = numpy.tile(numpy.arange(0, frame_length), (frames_num, 1)) + numpy.tile(
        numpy.arange(0, frames_num * frame_step, frame_step),
        (frame_length, 1)).T  # �൱�ڶ�����֡��ʱ�����г�ȡ���õ�frames_num*frame_length���ȵľ���
    indices = numpy.array(indices, dtype=numpy.int32)  # ��indicesת��Ϊ����
    frames = pad_signal[indices]  # �õ�֡�ź�
    win = numpy.tile(winfunc(frame_length), (frames_num, 1))  # window������������Ĭ��ȡ1
    return frames * win  # ����֡�źž���


def deframesignal(frames, signal_length, frame_length, frame_step, winfunc=lambda x: numpy.ones((x,))):
    '''���庯����ԭ�źŵ�ÿһ֡���б任��Ӧ����Ϊ������������
    �������壺
    frames:audio2frame�������ص�֡����
    signal_length:�źų���
    frame_length:֡����
    frame_step:֡���
    winfunc:��ÿһ֡��window�������з�����Ĭ�ϴ˴�����window
    '''
    # �Բ�������ȡ������
    signal_length = round(signal_length)  # �źŵĳ���
    frame_length = round(frame_length)  # ֡�ĳ���
    frames_num = numpy.shape(frames)[0]  # ֡������
    assert numpy.shape(frames)[1] == frame_length, '"frames"�����С����ȷ����������Ӧ�õ���һ֡����'  # �ж�framesά��
    indices = numpy.tile(numpy.arange(0, frame_length), (frames_num, 1)) + numpy.tile(
        numpy.arange(0, frames_num * frame_step, frame_step),
        (frame_length, 1)).T  # �൱�ڶ�����֡��ʱ�����г�ȡ���õ�frames_num*frame_length���ȵľ���
    indices = numpy.array(indices, dtype=numpy.int32)
    pad_length = (frames_num - 1) * frame_step + frame_length  # ��ƽ��������ź�
    if signal_length <= 0:
        signal_length = pad_length
    recalc_signal = numpy.zeros((pad_length,))  # ��������ź�
    window_correction = numpy.zeros((pad_length, 1))  # ������
    win = winfunc(frame_length)
    for i in range(0, frames_num):
        window_correction[indices[i, :]] = window_correction[indices[i, :]] + win + 1e-15  # ��ʾ�źŵ��ص��̶�
        recalc_signal[indices[i, :]] = recalc_signal[indices[i, :]] + frames[i, :]  # ԭ�źż����ص��̶ȹ��ɵ�������ź�
    recalc_signal = recalc_signal / window_correction  # �µĵ�������źŵ��ڵ����źŴ���ÿ�����ص��̶�
    return recalc_signal[0:signal_length]  # ���ظ��µĵ����ź�


def spectrum_magnitude(frames, NFFT):
    '''����ÿһ֡����FFY����Ժ��Ƶ�׵ķ��ȣ���frames�Ĵ�СΪN*L,�򷵻ؾ���Ĵ�СΪN*NFFT
    ����˵����
    frames:��audio2frame�����еķ���ֵ����֡����
    NFFT:FFT�任�������С,���֡����С��NFFT����֡�����ಿ����0�������
    '''
    complex_spectrum = numpy.fft.rfft(frames, NFFT)  # ��frames����FFT�任
    return numpy.absolute(complex_spectrum)  # ����Ƶ�׵ķ���ֵ


def spectrum_power(frames, NFFT):
    '''����ÿһ֡����Ҷ�任�Ժ�Ĺ�����
    ����˵����
    frames:audio2frame�������������֡����
    NFFT:FFT�Ĵ�С
    '''
    return 1.0 / NFFT * numpy.square(spectrum_magnitude(frames, NFFT))  # �����׵���ÿһ��ķ���ƽ��/NFFT


def log_spectrum_power(frames, NFFT, norm=1):
    '''����ÿһ֡�Ĺ����׵Ķ�����ʽ
    ����˵����
    frames:֡���󣬼�audio2frame���صľ���
    NFFT��FFT�任�Ĵ�С
    norm:����������һ��ϵ��
    '''
    spec_power = spectrum_power(frames, NFFT)
    spec_power[spec_power < 1e-30] = 1e-30  # Ϊ�˷�ֹ���ֹ����׵���0����Ϊ0�޷�ȡ����
    log_spec_power = 10 * numpy.log10(spec_power)
    if norm:
        return log_spec_power - numpy.max(log_spec_power)
    else:
        return log_spec_power


def pre_emphasis(signal, coefficient=0.95):
    '''���źŽ���Ԥ����
    �������壺
    signal:ԭʼ�ź�
    coefficient:����ϵ����Ĭ��Ϊ0.95
    '''
    return numpy.append(signal[0], signal[1:] - coefficient * signal[:-1])


# ����ÿһ֡��MFCCϵ��

# ���ȣ�Ϊ������汾3.x����Ҫ����xrange��ʹ�ã���Ϊ���ڰ汾2.xֻ��ʹ��range����Ҫ��xrange�滻Ϊrange
try:
    xrange(1)
except:
    xrange = range


def calcMFCC_delta_delta(signal, samplerate=16000, win_length=0.025, win_step=0.01, cep_num=13, filters_num=26,
                         NFFT=512, low_freq=0, high_freq=None, pre_emphasis_coeff=0.97, cep_lifter=22,
                         appendEnergy=True):
    '''����13��MFCC+13��һ��΢��ϵ��+13������ϵ��,һ��39��ϵ��
    '''
    feat = calcMFCC(signal, samplerate, win_length, win_step, cep_num, filters_num, NFFT, low_freq, high_freq,
                    pre_emphasis_coeff, cep_lifter, appendEnergy)  # ���Ȼ�ȡ13��һ��MFCCϵ��
    result1 = derivate(feat)
    result2 = derivate(result1)
    result3 = numpy.concatenate((feat, result1), axis=1)
    result = numpy.concatenate((result3, result2), axis=1)
    return result


def calcMFCC_delta(signal, samplerate=16000, win_length=0.025, win_step=0.01, cep_num=13, filters_num=26, NFFT=512,
                   low_freq=0, high_freq=None, pre_emphasis_coeff=0.97, cep_lifter=22, appendEnergy=True):
    '''����13��MFCC+13��һ��΢��ϵ��
    '''
    feat = calcMFCC(signal, samplerate, win_length, win_step, cep_num, filters_num, NFFT, low_freq, high_freq,
                    pre_emphasis_coeff, cep_lifter, appendEnergy)  # ���Ȼ�ȡ13��һ��MFCCϵ��
    result = derivate(feat)  # ����derivate����
    result = numpy.concatenate((feat, result), axis=1)
    return result


def derivate(feat, big_theta=2, cep_num=13):
    '''����һ��ϵ�����߼���ϵ����һ��任��ʽ
    ����˵��:
    feat:MFCC�������һ��ϵ������
    big_theta:��ʽ�еĴ�theta��Ĭ��ȡ2
    '''
    result = numpy.zeros(feat.shape)  # ���
    denominator = 0  # ��ĸ
    for theta in numpy.linspace(1, big_theta, big_theta):
        denominator = denominator + theta ** 2
    denominator = denominator * 2  # ����õ���ĸ��ֵ
    for row in numpy.linspace(0, feat.shape[0] - 1, feat.shape[0]):
        row = int(row)
        tmp = numpy.zeros((cep_num,))
        numerator = numpy.zeros((cep_num,))  # ����
        for t in numpy.linspace(1, cep_num, cep_num):
            t = int(t)
            a = 0
            b = 0
            s = 0
            for theta in numpy.linspace(1, big_theta, big_theta):
                theta = int(theta)
                if (t + theta) > cep_num:
                    a = 0
                else:

                    a = feat[row][t + theta - 1]
                if (t - theta) < 1:
                    b = 0
                else:
                    b = feat[row][t - theta - 1]
                s += theta * (a - b)
            numerator[t - 1] = s
        tmp = numerator * 1.0 / denominator
        result[row] = tmp
    return result


def calcMFCC(signal, samplerate=16000, win_length=0.025, win_step=0.01, cep_num=13, filters_num=26, NFFT=512,
             low_freq=0, high_freq=None, pre_emphasis_coeff=0.97, cep_lifter=22, appendEnergy=True):
    '''����13��MFCCϵ��
    �������壺
    signal:ԭʼ��Ƶ�źţ�һ��Ϊ.wav��ʽ�ļ�
    samplerate:����Ƶ�ʣ�����Ĭ��Ϊ16KHz
    win_length:�����ȣ�Ĭ�ϼ�һ֡Ϊ25ms
    win_step:�������Ĭ������¼�����֡��ʼʱ��֮�����10ms
    cep_num:����ϵ���ĸ�����Ĭ��Ϊ13
    filters_num:�˲����ĸ�����Ĭ��Ϊ26
    NFFT:����Ҷ�任��С��Ĭ��Ϊ512
    low_freq:���Ƶ�ʣ�Ĭ��Ϊ0
    high_freq:���Ƶ��
    pre_emphasis_coeff:Ԥ����ϵ����Ĭ��Ϊ0.97
    cep_lifter:���׵�����������
    appendEnergy:�Ƿ����������Ĭ�ϼ�
    '''

    feat, energy = fbank(signal, samplerate, win_length, win_step, filters_num, NFFT, low_freq, high_freq,
                         pre_emphasis_coeff)
    feat = numpy.log(feat)
    feat = dct(feat, type=2, axis=1, norm='ortho')[:, :cep_num]  # ������ɢ���ұ任,ֻȡǰ13��ϵ��
    feat = lifter(feat, cep_lifter)
    if appendEnergy:
        feat[:, 0] = numpy.log(energy)  # ֻȡ2-13��ϵ������һ���������Ķ���������
    return feat


def fbank(signal, samplerate=16000, win_length=0.025, win_step=0.01, filters_num=26, NFFT=512, low_freq=0,
          high_freq=None, pre_emphasis_coeff=0.97):
    '''������Ƶ�źŵ�MFCC
    ����˵����
    samplerate:����Ƶ��
    win_length:������
    win_step:�����
    filters_num:÷���˲�������
    NFFT:FFT��С
    low_freq:���Ƶ��
    high_freq:���Ƶ��
    pre_emphasis_coeff:Ԥ����ϵ��
    '''

    high_freq = high_freq or samplerate / 2  # ������Ƶ���������Ƶ��
    signal = pre_emphasis(signal, pre_emphasis_coeff)  # ��ԭʼ�źŽ���Ԥ���ش���
    frames = audio2frame(signal, win_length * samplerate, win_step * samplerate)  # �õ�֡����
    spec_power = spectrum_power(frames, NFFT)  # �õ�ÿһ֡FFT�Ժ��������
    energy = numpy.sum(spec_power, 1)  # ��ÿһ֡�������׽������
    energy = numpy.where(energy == 0, numpy.finfo(float).eps, energy)  # ������Ϊ0�ĵط�����Ϊeps���������ڽ��ж�������
    fb = get_filter_banks(filters_num, NFFT, samplerate, low_freq, high_freq)  # ���ÿһ���˲�����Ƶ�ʿ��
    feat = numpy.dot(spec_power, fb.T)  # ���˲����������׽��е��
    feat = numpy.where(feat == 0, numpy.finfo(float).eps, feat)  # ͬ�����ܳ���0
    return feat, energy


def log_fbank(signal, samplerate=16000, win_length=0.025, win_step=0.01, filters_num=26, NFFT=512, low_freq=0,
              high_freq=None, pre_emphasis_coeff=0.97):
    '''�������ֵ
    �������壺ͬ��
    '''
    feat, energy = fbank(signal, samplerate, win_length, win_step, filters_num, NFFT, low_freq, high_freq,
                         pre_emphasis_coeff)
    return numpy.log(feat)


def ssc(signal, samplerate=16000, win_length=0.025, win_step=0.01, filters_num=26, NFFT=512, low_freq=0, high_freq=None,
        pre_emphasis_coeff=0.97):
    '''
    ������
    '''
    high_freq = high_freq or samplerate / 2
    signal = pre_emphasis(signal, pre_emphasis_coeff)
    frames = audio2frame(signal, win_length * samplerate, win_step * samplerate)
    spec_power = spectrum_power(frames, NFFT)
    spec_power = numpy.where(spec_power == 0, numpy.finfo(float).eps, spec_power)  # ������
    fb = get_filter_banks(filters_num, NFFT, samplerate, low_freq, high_freq)
    feat = numpy.dot(spec_power, fb.T)  # ��������
    R = numpy.tile(numpy.linspace(1, samplerate / 2, numpy.size(spec_power, 1)), (numpy.size(spec_power, 0), 1))
    return numpy.dot(spec_power * R, fb.T) / feat


def hz2mel(hz):
    '''��Ƶ��hzת��Ϊ÷��Ƶ��
    ����˵����
    hz:Ƶ��
    '''
    return 2595 * numpy.log10(1 + hz / 700.0)


def mel2hz(mel):
    '''��÷��Ƶ��ת��Ϊhz
    ����˵����
    mel:÷��Ƶ��
    '''
    return 700 * (10 ** (mel / 2595.0) - 1)


def get_filter_banks(filters_num=20, NFFT=512, samplerate=16000, low_freq=0, high_freq=None):
    '''����÷�����Ǽ���˲��������˲����ڵ�һ��Ƶ�ʺ͵�����Ƶ�ʴ�Ϊ0���ڵڶ���Ƶ�ʴ�Ϊ1
    ����˵����
    filers_num:�˲�������
    NFFT:FFT��С
    samplerate:����Ƶ��
    low_freq:���Ƶ��
    high_freq:���Ƶ��
    '''
    # ���ȣ���Ƶ��hzת��Ϊ÷��Ƶ�ʣ���Ϊ�˶��ֱ������Ĵ�С��Ƶ�ʲ����������ȣ����Ի�Ϊ÷��Ƶ�������Էָ�
    low_mel = hz2mel(low_freq)
    high_mel = hz2mel(high_freq)
    # ��Ҫ��low_mel��high_mel֮��ȼ�����filters_num���㣬һ��filters_num+2����
    mel_points = numpy.linspace(low_mel, high_mel, filters_num + 2)
    # �ٽ�÷��Ƶ��ת��ΪhzƵ�ʣ������ҵ���Ӧ��hzλ��
    hz_points = mel2hz(mel_points)
    # ����������Ҫ֪����Щhz_points��Ӧ��fft�е�λ��
    bin = numpy.floor((NFFT + 1) * hz_points / samplerate)
    # �����������˲����ı��ʽ�ˣ�ÿ���˲����ڵ�һ���㴦�͵������㴦��Ϊ0���м�Ϊ��������״
    fbank = numpy.zeros([filters_num, NFFT / 2 + 1])
    for j in xrange(0, filters_num):
        for i in xrange(int(bin[j]), int(bin[j + 1])):
            fbank[j, i] = (i - bin[j]) / (bin[j + 1] - bin[j])
        for i in xrange(int(bin[j + 1]), int(bin[j + 2])):
            fbank[j, i] = (bin[j + 2] - i) / (bin[j + 2] - bin[j + 1])
    return fbank


def lifter(cepstra, L=22):
    '''�����׺���
    ����˵����
    cepstra:MFCCϵ��
    L����ϵ����Ĭ��Ϊ22
    '''
    if L > 0:
        nframes, ncoeff = numpy.shape(cepstra)
        n = numpy.arange(ncoeff)
        lift = 1 + (L / 2) * numpy.sin(numpy.pi * n / L)
        return lift * cepstra
    else:
        return cepstra


# PLOTTING FUNCTIONS for RP_EXTRACT features and Audio Waveforms
def plotmatrix(features, xlabel=None, ylabel=None):
    pylab.figure()
    pylab.imshow(features, origin='lower', aspect='auto', interpolation='nearest')
    if xlabel: plt.xlabel(xlabel)
    if ylabel: pylab.ylabel(ylabel)
    pylab.show()


def plotrp(features, reshape=True, rows=24, cols=60):
    if reshape:
        features = features.reshape(rows, cols, order='F')
    plotmatrix(features, 'Modulation Frequency Index', 'Frequency Band [Bark]')


def plotssd(features, reshape=True, rows=24, cols=7):
    if reshape:
        features = features.reshape(rows, cols, order='F')

    pylab.figure()
    pylab.imshow(features, origin='lower', aspect='auto', interpolation='nearest')
    pylab.xticks(range(0, cols), ['mean', 'var', 'skew', 'kurt', 'median', 'min', 'max'])
    pylab.ylabel('Frequency [Bark]')
    pylab.show()


def plotrh(hist, showbpm=True):
    xrange = range(0, hist.shape[0])
    plt.bar(xrange, hist)  # 50, normed=1, facecolor='g', alpha=0.75)

    # plt.ylabel('Probability')
    plt.title('Rhythm Histogram')
    if showbpm:
        mod_freq_res = 1.0 / (2 ** 18 / 44100.0)
        # print type(xrange)
        plotrange = range(1, hist.shape[0] + 1, 5)  # 5 = step
        bpm = np.around(np.array(plotrange) * mod_freq_res * 60.0, 0)
        pylab.xticks(plotrange, bpm)
        plt.xlabel('bpm')
    else:
        plt.xlabel('Mod. Frequency Index')
    plt.show()


def plotmono_waveform(samples, plot_width=6, plot_height=4):
    fig = plt.figure(num=None, figsize=(plot_width, plot_height), dpi=72, facecolor='w', edgecolor='k')

    if len(samples.shape) > 1:
        # if we have more than 1 channel, build the average
        samples_to_plot = samples.copy().mean(axis=1)
    else:
        samples_to_plot = samples

    channel_1 = fig.add_subplot(111)
    channel_1.set_ylabel('Channel 1')
    # channel_1.set_xlim(0,song_length) # todo
    channel_1.set_ylim(-1, 1)

    channel_1.plot(samples_to_plot)

    plt.show();
    plt.clf();


def plotstereo_waveform(samples, plot_width=6, plot_height=5):
    fig = plt.figure(num=None, figsize=(plot_width, plot_height), dpi=72, facecolor='w', edgecolor='k')

    channel_1 = fig.add_subplot(211)
    channel_1.set_ylabel('Channel 1')
    # channel_1.set_xlim(0,song_length) # todo
    channel_1.set_ylim(-1, 1)
    channel_1.plot(samples[:, 0])

    channel_2 = fig.add_subplot(212)
    channel_2.set_ylabel('Channel 2')
    channel_2.set_xlabel('Time (s)')
    channel_2.set_ylim(-1, 1)
    # channel_2.set_xlim(0,song_length) # todo
    channel_2.plot(samples[:, 1])

    plt.show();
    plt.clf();


def plot_waveform(samples, plot_width=6, plot_height=4):
    # mono wave data is either only 1dim in shape or has a 2dim shape with 1 channel only
    if (len(samples.shape) == 1) or (samples.shape[1] == 1):
        print "Plotting Mono"
        plotmono_waveform(samples, plot_width, plot_height)
    else:
        print "Plotting Stereo"
        plotstereo_waveform(samples, plot_width, plot_height)


""" scale frequency axis logarithmically """


def logscale_spec(spec, sr=44100, factor=20.):
    timebins, freqbins = np.shape(spec)

    scale = np.linspace(0, 1, freqbins) ** factor
    scale *= (freqbins - 1) / max(scale)
    scale = np.unique(np.round(scale))

    # create spectrogram with new freq bins
    newspec = np.complex128(np.zeros([timebins, len(scale)]))
    for i in range(0, len(scale)):
        if i == len(scale) - 1:
            newspec[:, i] = np.sum(spec[:, scale[i]:], axis=1)
        else:
            newspec[:, i] = np.sum(spec[:, scale[i]:scale[i + 1]], axis=1)

    # list center freq of bins
    allfreqs = np.abs(np.fft.fftfreq(freqbins * 2, 1. / sr)[:freqbins + 1])
    freqs = []
    for i in range(0, len(scale)):
        if i == len(scale) - 1:
            freqs += [np.mean(allfreqs[scale[i]:])]
        else:
            freqs += [np.mean(allfreqs[scale[i]:scale[i + 1]])]

    return newspec, freqs


def stft(sig, frameSize, overlapFac=0.5, window=np.hanning):
    win = window(frameSize)
    hopSize = int(frameSize - np.floor(overlapFac * frameSize))

    # zeros at beginning (thus center of 1st window should be for sample nr. 0)
    samples = np.append(np.zeros(np.floor(frameSize / 2.0)), sig)
    # cols for windowing
    cols = np.ceil((len(samples) - frameSize) / float(hopSize)) + 1
    # zeros at end (thus samples can be fully covered by frames)
    samples = np.append(samples, np.zeros(frameSize))

    frames = stride_tricks.as_strided(samples, shape=(cols, frameSize),
                                      strides=(samples.strides[0] * hopSize, samples.strides[0])).copy()
    frames *= win

    return np.fft.rfft(frames)


def plotstft(samples, samplerate, binsize=2 ** 10, plotpath=None, colormap="jet", ax=None, fig=None, plot_width=6,
             plot_height=4, ignore=False):
    if ignore:
        import warnings

        warnings.filterwarnings('ignore')

    s = stft(samples, binsize)

    sshow, freq = logscale_spec(s, factor=1.0, sr=samplerate)
    ims = 20. * np.log10(np.abs(sshow) / 10e-6)  # amplitude to decibel

    timebins, freqbins = np.shape(ims)

    if ax is None:
        fig, ax = plt.subplots(1, 1, sharey=True, figsize=(plot_width, plot_height))

    # ax.figure(figsize=(15, 7.5))
    cax = ax.imshow(np.transpose(ims), origin="lower", aspect="auto", cmap=colormap, interpolation="none")
    # cbar = fig.colorbar(cax, ticks=[-1, 0, 1], cax=ax)
    # ax.set_colorbar()

    ax.set_xlabel("time (s)")
    ax.set_ylabel("frequency (hz)")
    ax.set_xlim([0, timebins - 1])
    ax.set_ylim([0, freqbins])

    xlocs = np.float32(np.linspace(0, timebins - 1, 5))
    ax.set_xticks(xlocs, ["%.02f" % l for l in ((xlocs * len(samples) / timebins) + (0.5 * binsize)) / samplerate])
    ylocs = np.int16(np.round(np.linspace(0, freqbins - 1, 10)))
    ax.set_yticks(ylocs, ["%.02f" % freq[i] for i in ylocs])

    if plotpath:
        plt.savefig(plotpath, bbox_inches="tight")
    else:
        plt.show()

    # plt.clf();
    b = ["%.02f" % l for l in ((xlocs * len(samples) / timebins) + (0.5 * binsize)) / samplerate]
    return xlocs, b, timebins


def is_R_or_N(user_in_date=2017):  # �ж��Ƿ�����
    # user_in_date = int(input('��������λ����ݣ�'))
    # print user_in_date
    value_r_n = user_in_date % 4 == 0 and user_in_date % 100 != 0
    if value_r_n:
        result = str(user_in_date) + '������'
        # print result
    else:
        result = str(user_in_date) + '��������'
        # print result
    return value_r_n


def get_mEnd_days(mEnd=12, is_R_N=True):
    totaldays = 0
    if is_R_N:
        if mEnd == 12:
            totaldays = 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30 + 31 + 29 + 31
        elif mEnd == 11:
            totaldays = 31 + 30 + 31 + 31 + 30 + 31 + 30 + 31 + 29 + 31
        elif mEnd == 10:
            totaldays = 30 + 31 + 31 + 30 + 31 + 30 + 31 + 29 + 31
        elif mEnd == 9:
            totaldays = 31 + 31 + 30 + 31 + 30 + 31 + 29 + 31
        elif mEnd == 8:
            totaldays = 31 + 30 + 31 + 30 + 31 + 29 + 31
        elif mEnd == 7:
            totaldays = 30 + 31 + 30 + 31 + 29 + 31
        elif mEnd == 6:
            totaldays = 31 + 30 + 31 + 29 + 31
        elif mEnd == 5:
            totaldays = 30 + 31 + 29 + 31
        elif mEnd == 4:
            totaldays = 31 + 29 + 31
        elif mEnd == 3:
            totaldays = 29 + 31
        elif mEnd == 2:
            totaldays = 31
        elif mEnd == 1:
            totaldays = 0
    else:
        if mEnd == 12:
            totaldays = 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30 + 31 + 28 + 31
        elif mEnd == 11:
            totaldays = 31 + 30 + 31 + 31 + 30 + 31 + 30 + 31 + 28 + 31
        elif mEnd == 10:
            totaldays = 30 + 31 + 31 + 30 + 31 + 30 + 31 + 28 + 31
        elif mEnd == 9:
            totaldays = 31 + 31 + 30 + 31 + 30 + 31 + 28 + 31
        elif mEnd == 8:
            totaldays = 31 + 30 + 31 + 30 + 31 + 28 + 31
        elif mEnd == 7:
            totaldays = 30 + 31 + 30 + 31 + 28 + 31
        elif mEnd == 6:
            totaldays = 31 + 30 + 31 + 28 + 31
        elif mEnd == 5:
            totaldays = 30 + 31 + 28 + 31
        elif mEnd == 4:
            totaldays = 31 + 28 + 31
        elif mEnd == 3:
            totaldays = 28 + 31
        elif mEnd == 2:
            totaldays = 31
        elif mEnd == 1:
            totaldays = 0

    return totaldays


def get_year_toatal_days(year=2017):
    if is_R_or_N(year):
        total = 366
    else:
        total = 365
    return total


def get_yEnd_yStart_days(yEnd=2017, yStart=1949):
    totaday = 0
    years = range(yStart + 1, yEnd)
    for year_every in years:
        if is_R_or_N(year_every):
            totaday += 366
        else:
            totaday += 365
    return totaday


def countDaysBettweenTwo(dayStart='20150101', dayEnd='20170102'):
    yStart, mStart, dStart = int(dayStart[:4]), int(dayStart[4:6]), int(dayStart[6:8])
    yEnd, mEnd, dEnd = int(dayEnd[:4]), int(dayEnd[4:6]), int(dayEnd[6:8])
    print 'dayStart:', yStart, mStart, dStart
    print 'dayEnd:', yEnd, mEnd, dEnd

    dayPast = dEnd + get_mEnd_days(mEnd, is_R_or_N(yEnd))

    dayLeft = get_year_toatal_days(yStart) - dStart - get_mEnd_days(mStart, is_R_or_N(yStart))

    if yEnd - yStart == 1:
        FinalanswerDay = dayPast + dayLeft
    elif yEnd - yStart < 1:
        FinalanswerDay = dayPast - dStart - get_mEnd_days(mStart, is_R_or_N(yStart))
    else:
        FinalanswerDay = dayPast + dayLeft + get_yEnd_yStart_days(yEnd, yStart)
    return FinalanswerDay


def pdf_link_2_txt(path_pdf='drm20150330-20170310.pdf'):
    PDFFile = open(path_pdf, 'rb')

    PDF = pyPdf.PdfFileReader(PDFFile)
    pages = PDF.getNumPages()
    key = '/Annots'
    uri = '/URI'
    ank = '/A'
    all_link = []
    for page in range(pages):

        pageSliced = PDF.getPage(page)
        pageObject = pageSliced.getObject()

        if pageObject.has_key(key):
            ann = pageObject[key]
            for a in ann:
                u = a.getObject()
                if u[ank].has_key(uri):
                    print u[ank][uri]
                    if 'maomaoChyan' not in u[ank][uri]:
                        if 'channel' not in u[ank][uri]:
                            all_link.append(u[ank][uri])
    print len(all_link)
    print all_link
    print all_link[1]
    out_path = path_pdf.replace('.pdf', '.txt')
    file_txt = open(out_path, 'w')
    for link in all_link:
        file_txt.writelines(link)
        file_txt.writelines('\n')
    file_txt.close()
    return out_path


def download_youtube(link_txt='linkdrm20130701-20150325.txt'):
    txt_file = open(link_txt, 'r')
    links = txt_file.readlines()
    txt_file.close()
    for download_link in tqdm(links):
        # print links
        command = "youtube-dl " + download_link.split('&')[0] + " -c"
        print command
        call(command.split(), shell=False)

    # command = "youtube-dl https://www.youtube.com/watch?v=NG3WygJmiVs -c"
    # call(command.split(), shell=False)
    return 0


def rename_tag(rename_file_dir='toberename', tag='[��]'):
    for parent, dirnames, filenames in os.walk(rename_file_dir):
        for filename in filenames:
            files_in = os.path.join(parent, filename)
            files_in_name = os.path.basename(files_in)
            files_out = files_in.replace(files_in_name, tag + files_in_name)
            os.rename(files_in, files_out)
    return 0


def modify_markdown(path_to_process='post'):
    for parent, dirnames, filenames in os.walk(path_to_process):
        for filename in filenames:
            file_path = os.path.join(parent, filename)
            file_md = open(file_path, 'r')
            all_lines = file_md.readlines()
            file_md.close()
            for line in all_lines:
                if 'category: ' in line:
                    value = line
                    insert_index = all_lines.index(value)
                    all_lines.remove(value)
                    all_lines.insert(insert_index, '- ' + value.split(' ')[1] + '\n')
                    all_lines.insert(insert_index, 'categories:\n')
            file_md = open(file_path, 'w')
            file_md.writelines(all_lines)
    return 0
