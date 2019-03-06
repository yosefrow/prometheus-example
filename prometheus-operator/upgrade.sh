#!/bin/bash

helm upgrade prometheus-operator stable/prometheus-operator -f values.yaml
