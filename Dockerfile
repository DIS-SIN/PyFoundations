
# anaconda 4 will be used as the base image
FROM node:8.15

WORKDIR /app

COPY . /app

WORKDIR /app/static

RUN npm install

RUN npm run build

FROM store/continuumio/anaconda:4.0.0

RUN conda update conda 
# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY --from=0 /app .

# Install any needed packages specified in requirements.txt
RUN conda env update -f environment.yml
ARG DOL_SECRET_KEY
ENV DOL_SECRET_KEY = $DOL_SECRET_KEY
ARG DOL_SQLALCHEMY_DATABASE_URI
ENV DOL_SQLALCHEMY_DATABASE_URI = $DOL_SQLALCHEMY_DATABASE_URI
# Make port 80 available to the world outside this container
RUN echo "source activate $(head -1 /app/environment.yml | cut -d' ' -f2)" > ~/.bashrc
ENV PATH /opt/conda/envs/$(head -1 /tmp/environment.yml | cut -d' ' -f2)/bin:$PATH
#RUN echo "python /app/application.py --mode production" >> ~/.bashrc
ENTRYPOINT ["/opt/conda/envs/PyFoundations/bin/python"]
CMD ["application.py"] 
EXPOSE 5054

# Define environment variable


# Run app.py when the container launches
#CMD ["python", "application.py"]

############################################################################
# docker for newbs manpage
# Working windows? probably are, if so:
# Get docker! It's awesome, but there's a learning curve
#
# So...
#
# Watch this: https://www.youtube.com/watch?v=YFl2mCHdv24
# Go here: https://hub.docker.com/editions/community/docker-ce-desktop-windows
# Go here: https://hub.docker.com/?ref=login
# Go here: https://docs.docker.com/get-started/
# Go here: https://docs.docker.com/machine/overview/
# Go here: https://hub.docker.com/_/python
# Go here: https://denibertovic.com/posts/handling-permissions-with-docker-volumes/
# Go here: https://docs.docker.com/storage/bind-mounts/
# go here: https://rominirani.com/docker-tutorial-series-part-3-more-on-images-and-containers-68ce7a026fc1
#
# -- IN DOCKERFILE
# -- this is going to make 5054 available to the actual machine in the real world
#
# EXPOSE 5054
#
# -- IN FLASK APP
# -- this is magic, the zeros allow you to tap into the arcane 
# -- and let the real world find you
#
# app.run(host = '0.0.0.0', port=5054)
#
# -- IN GIT BASH: PRE LAUNCH CLEANUP
# -- If you like to test, probably need to clean up
# -- the ### is the first 3 alpha/num of the item (container or image)
#
# docker container ls
# docker container stop ###
# docker rm ###
# docker image ls
# docker rmi ###
#
# -- IN GIT BASH: Start the docker magic
# -- note the period. That's key magic
# docker build --tag=dol .
#
# -- note the /tcp, That's key magic
# -- you are punching a hole through realities and wiring them up
#
# docker run -p 5054:5054/tcp dol
#
# -- in the real world
# http://localhost:5054/
#
# Celebrate human, it used to take a team of dev ops to do what you just did
# the future, tis wow.
#
# Oh and one more tip. Use Git Bash (from MINGW64), it's worth it
#
