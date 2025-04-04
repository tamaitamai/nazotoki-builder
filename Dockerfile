# Java 17の軽量イメージを使用
FROM openjdk:17-jdk-slim  

# 作業ディレクトリを作成
WORKDIR /app  

# JARファイルをコンテナにコピー
COPY target/*.jar app.jar  

# ポートを指定（Spring Bootのデフォルトは8080）
EXPOSE 8080  

# アプリケーションを実行
CMD ["java", "-jar", "app.jar"]
