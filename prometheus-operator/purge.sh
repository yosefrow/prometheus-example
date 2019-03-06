#!/bin/bash

helm delete --purge prometheus-operator
kubectl delete crd alertmanagers.monitoring.coreos.com prometheuses.monitoring.coreos.com prometheusrules.monitoring.coreos.com servicemonitors.monitoring.coreos.com

