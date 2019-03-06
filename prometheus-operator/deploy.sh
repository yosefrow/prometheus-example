#!/bin/bash

helm install --name prometheus --namespace prometheus-operator -f values.yaml stable/prometheus-operator
