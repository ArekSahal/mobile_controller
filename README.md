# game_controller

install:

- flask 

- flask-socketio

- pynput

- eventlet


If on linux I heard you need to set and hope for the best. Something with a x-server as well: 


    $ DISPLAY=:0 python -c 'import pynput'

You need to start the backend and frontend separately :

Start backend:

    cd controller_server
    python3 run.py

Start frontend:

    cd controller_frontend
    npm run build
    serve -l 3000 -s build
The controller will then be found at port 3000.
    
there should be a "connected" print in the terminal of the backend if everything worked.
    

# Still to be done:
Lower ping method
- the ping is very unstable. It ranges from 5 - 150 ms. The problem might be that the router is givving the servers a low priority.

Two players 
- At the moment it is probably best to go for a method where one keyboard is connected but the two players are assigned different buttons. somehow use client id for player selection. something something ipac2
    
