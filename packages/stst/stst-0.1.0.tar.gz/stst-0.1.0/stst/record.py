# coding: utf8
from __future__ import print_function

import csv

import numpy as np

import config


def record(train_file, dev_file, pearsonr, model):
    with open(config.RECORD_DIR + '/record.csv', 'ab') as f:
        writer = csv.writer(f, delimiter=',')
        features = [ feature.feature_name for feature in model.feature_list ]
        writer.writerow([ model.model_name, pearsonr, model.classifier.strategy.trainer, features, train_file, dev_file ])


def record_corpus(train_file, lang, translator, pearsonr, model, info, weig=True):
    w = [0.205, 0.176, 0.209, 0.214, 0.193]
    with open(config.RECORD_DIR + '/record_lang.csv', 'ab') as f:
        writer = csv.writer(f, delimiter=',')
        features = [feature.feature_name for feature in model.feature_list]
        score = -1.0
        if weig:
            score = np.dot(w, info.values())

        writer.writerow([model.model_name, pearsonr, lang, translator, model.classifier.strategy.trainer, features, train_file]
                        + info.keys() + info.values() + [score])


def record_other_corpus(train_file, lang, translator, model, info):
    with open(config.RECORD_DIR + '/record_others.csv', 'ab') as f:
        writer = csv.writer(f, delimiter=',')
        features = [feature.feature_name for feature in model.feature_list]
        writer.writerow([model.model_name, lang, translator, model.classifier.strategy.trainer, features, train_file]
                        + info.values() + info.keys())

