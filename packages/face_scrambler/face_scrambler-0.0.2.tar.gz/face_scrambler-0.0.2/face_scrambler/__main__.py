import sys
from face_scrambler import gui


def main(args=None):
    """The main routine."""
    if args is None:
        args = sys.argv[1:]
    gui.main()
    

if __name__ == "__main__":
    main()