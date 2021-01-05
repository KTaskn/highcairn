# ベースイメージの指定
FROM python:3.6

RUN TZ=Asia/Tokyo

RUN apt-get update
RUN apt-get install unzip

# フォントデータをインストール
ARG resources_dir=/resources
RUN mkdir -p $resources_dir
WORKDIR $resources_dir
RUN wget -O Noto_Sans_JP.zip https://fonts.google.com/download?family=Noto%20Sans%20JP
RUN unzip Noto_Sans_JP.zip

# ソースを置くディレクトリを変数として格納                                                  
ARG project_dir=/var/www

# 必要なファイルをローカルからコンテナにコピー
RUN mkdir -p $project_dir

# requirements.txtに記載されたパッケージをインストール                         
WORKDIR $project_dir
ADD ./requirements.txt $project_dir

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

CMD ["gunicorn", "highcairn.asgi:application", "-k", "uvicorn.workers.UvicornWorker", "--bind=0.0.0.0:8000"]