#!/bin/bash

helm install --namespace prometheus-exporter --name prometheus-exporter charts/prometheus-exporter
