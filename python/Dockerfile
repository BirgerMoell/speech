FROM python:3.6.8
# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /app/requirements.txt

# We create an app folder inside the docker image
# Which will contain our server
WORKDIR /app

#RUN pip3 install https://github.com/google/sentencepiece/releases/download/v0.1.84/sentencepiece-0.1.84-cp38-cp38-manylinux1_x86_64.whl
RUN pip3 install sentencepiece==0.1.82
RUN pip3 install -r requirements.txt

#RUN apt install nvidia-361-dev
#RUN find /usr/ -name 'libcuda.so.1' > -exec cp "{}" /usr/local/cuda/lib/
# We copy our local directory to the image app folder
COPY . ./

# Development version of the flask app
# CMD python3 app.py

# Run the gunicorn production deployment for the flask app
CMD uvicorn --port 8001 main:app --reload