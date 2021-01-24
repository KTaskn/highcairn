# backup postgres and upload a backupfile to dropbox
# add pgpass
echo "*:*:*:*:${POSTGRES_PASSWORD}" > ~/.pgpass
chmod 600 ~/.pgpass

filename=`date "+%Y%m%d"`.sql
pg_dump --format=plain -h db -p 5432 -U ${POSTGRES_USER} highcairn > /work/backup.sql
/work/dropbox_uploader.sh upload /work/backup.sql $filename