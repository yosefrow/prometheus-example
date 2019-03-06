#!/bin/bash

helm install --name prometheus-operator --namespace prometheus-operator -f values.yaml stable/prometheus-operator
