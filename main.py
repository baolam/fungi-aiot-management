import time
from python.constant import *
from python.program import stop_program, start_manager
from python.handler.device import *

def main():
    try:
        start_manager()
        while not interupt_event.is_set():
            time.sleep(2)
    except KeyboardInterrupt as e:
        stop_program()

if __name__ == "__main__":
    main()