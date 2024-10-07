print("Hello, World!")


# 1 variable 
x=10
y=3.54
name ="akhtar mohammad naji"
is_student = True




# 2. Basic Arithmetic Operations
a=3
b=6

print("summition\n",a+b)
print("subtraction\n",a-b)
print("multiplication \n",a*b)
print("divid \n",a/b)
print("modul\n",a%b)


# 3. Comments
# This is a comment and won't be executed



# 4. Control Flow (if-elif-else)

age =18
if age>= 18:
    print("Adult")
else:
    print("Not adult")





# 5. Loops

for i in range(5):
    print("\n number for for loop",i)



# while loop

my_number =0
while my_number<5:
    print("number from while ",my_number)
    my_number+=1




# 6. Functions
print("6. Functions")
def greeting(name):
    return f"My name is {name}"


print(greeting("Akhtar"))



# 7. list

print("7. list")

frouts = ["apple","orange","banana","mango"]
print(frouts[0])

print("print befor append",frouts)
frouts.append("changed")

print("print after append",frouts)


# 8. Dictionaries
print("8. Dictionaries")


data = {"name":"akthar mohammad","age":24}

print(data["name"])
data["age"]= 25

print(data)


# 9. Importing Module
print("9. Importing Module")
import math

print("find the square of number 16")
print(math.sqrt(16))


# 10. File Handling

print("10. File Handling")


with open("./new.txt","w") as file:
    file.write("hellow this if from python writing")


with open("new.txt","r") as file:
    content = file.read()
    print("The file content is :",content)

# 11. Classes and Objects (OOP Basics)

print('11. Classes and Objects (OOP Basics)')


class Dog:
    def __init__(self,name1,age1) :
        self.name1= name1
        self.age1 = age1
    

    def bark(self):
        return f"Teh {self.name1} which is {self.age1} years old is barking"
    

d1 =  Dog("Hode",4)

print(d1.bark())


class Human:
    def __init__(self,name2,age2,sex):
        self.name2=name2
        self.age2= age2
        self.sex = sex


    def femal(self):
        return f"She is {self.name2},her age is {self.age2}"
    


    def male(self):
        return f"He is {self.name2},his age is {self.age2}"
    
h1 = Human("akhtar ",25,"Male")
h2= Human("Roqia",27,"Female")

print(h1.male())
print(h2.femal())



# 12. Exception Handling
print("12. Exception Handling")

try:
    x= 10/0
except ZeroDivisionError:
    print("Cannot divide by zero")


# 13. Libraries and Packages

print("13. Libraries and Packages")

import requests

data = requests.get("https://www.example.com")
print("request code ",data.status_code)



# 14. List Comprehension
print("14. List Comprehension")


list1 = [1,2,3,4,5]

list2= [n**2 for n in list1]
print("list one is ",list1)
print("second list is ",list2)



# 15. Using pip to Install Libraries
print("15. Using pip to Install Libraries")

# Example: Installing the requests library
# pip install requests

# 16 mini project to do task app

# Simple To-Do List using a list and functions


print("16 mini project to do task app")

todo_list = []

def add_task(task):
    todo_list.append(task)
    print(f"Added task: {task}")

def show_tasks():
    print("To-Do List:")
    for index, task in enumerate(todo_list, start=1):
        print(f"{index}. {task}")

def remove_task(task_number):
    if 0 < task_number <= len(todo_list):
        removed_task = todo_list.pop(task_number - 1)
        print(f"Removed task: {removed_task}")
    else:
        print("Invalid task number")

# Main Program
while True:
    print("\n1. Add Task\n2. Show Tasks\n3. Remove Task\n4. Exit")
    choice = int(input("Choose an option: "))

    if choice == 1:
        task = input("Enter a task: ")
        add_task(task)
    elif choice == 2:
        show_tasks()
    elif choice == 3:
        task_number = int(input("Enter the task number to remove: "))
        remove_task(task_number)
    elif choice == 4:
        print("Exiting the program")
        break
    else:
        print("Invalid choice")



tadkList = []


def addTask(task):
    tadkList.append(task)
    print("The added task is :",task)



def showTasks():
    for index, listItem in enumerate(tadkList , setattr=1):
        print(f"{index}. {listItem}")


def removeTask(taskNumber):
    if 0< taskNumber<=len(tadkList):
        removedTask = tadkList.pop(taskNumber)
        print("Removed task is ",removedTask)

    else:
        print("Invalid task number")
    








while True:
    print("\n1. Add Task\n2. Show Tasks\n3. Remove Task\n4. Exit")
    choise = input("Enter the task number: ")

    if choice==1:
        task = input("Enter the task description: ")
        add_task(task)
    elif choice==2:
        show_tasks()
    elif choice ==3:
        taskNumber = input("Enter the task number to be deleted: ")
        remove_task(taskNumber)
    elif choice==4:
        print("Exiting the prgram")
        break
    else :
        print("Invalid choice !")
    
    
