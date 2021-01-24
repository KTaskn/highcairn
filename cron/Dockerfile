FROM debian:buster

# タイムゾーン設定
RUN TZ=Asia/Tokyo

# busyboxをインストール
RUN apt-get update
RUN apt-get install -y busybox-static
RUN apt-get clean

# 作業ディレクトリを追加、変更
ARG project_dir=/work
RUN mkdir -p $project_dir
WORKDIR $project_dir

# cronファイルを設定
ADD ./cron.edit /var/spool/cron/crontabs/root

# 実行ファイルを追加
ADD ./run.sh $project_dir
RUN chmod 700 $project_dir/run.sh

# 初期化ファイルを追加実行
ADD ./init_run.sh $project_dir
RUN chmod 700 $project_dir/init_run.sh
RUN $project_dir/init_run.sh

# busybox crond -f -L /dev/stderr
CMD ["busybox", "crond", "-f", "-L", "/dev/stderr"]