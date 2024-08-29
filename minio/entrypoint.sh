#!/bin/sh

export MINIO_MEASURE_UPLOAD_BUCKET_NAME="measure-upload"

echo "Creating bucket $MINIO_MEASURE_UPLOAD_BUCKET_NAME"
mkdir /data/$MINIO_MEASURE_UPLOAD_BUCKET_NAME

minio server /data