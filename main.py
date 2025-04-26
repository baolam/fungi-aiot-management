import time
from python.program import stop_program, start_manager
from python.variable import interupt_event
import python.handler.device
import python.handler.harvest

def main():
    try:
        start_manager()
        while not interupt_event.is_set():
            time.sleep(2)
    except KeyboardInterrupt as e:
        stop_program()

if __name__ == "__main__":
    main()