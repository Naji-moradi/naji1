# script.py

def add_numbers(a, b):
    return a + b

if __name__ == "__main__":
    import sys
    a = int(sys.argv[1])  # First argument
    b = int(sys.argv[2])  # Second argument
    result = add_numbers(a, b)
    print(result)
