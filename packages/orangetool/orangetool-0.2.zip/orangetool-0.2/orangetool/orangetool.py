import subprocess as sub
import socket
import requests
import re
import platform
import psutil
import os
import string
import random
ip_pattern=r"(?:[0-9]{1,3}\.){3}[0-9]{1,3}"
api_1="http://ipinfo.io/ip"

def internet(host="8.8.8.8", port=53, timeout=3):
    """
    Check Internet Connections.
    :param  host: the host that check connection to
    :param  port: port that check connection with
    :param  timeout: times that check the connnection
    :type host:str
    :type port:int
    :type timeout:int
    :return bool: True if Connection is Stable
    >>> internet() # if there is stable internet connection
    True
    >>> internet() # if there is no stable internet connection
    False
    """
    try:
        socket.setdefaulttimeout(timeout)
        socket.socket(socket.AF_INET, socket.SOCK_STREAM).connect((host, port))
        return True
    except Exception as ex:
        print(str(ex))
        return False

def local_ip(DEBUG=False):
    '''
    return local ip of computer in windows by socket module and in unix with hostname command in shell
    :param DEBUG:Flag for using Debug Mode
    :type DEBUG:bool
    :return: local ip as string
    '''
    try:
        ip=socket.gethostbyname(socket.gethostname())
        if ip!="127.0.0.1":
            return ip
        elif platform.system()!="Windows":
            command=sub.Popen(["hostname","-I"],stdout=sub.PIPE,stderr=sub.PIPE,stdin=sub.PIPE,shell=False)
            response=list(command.communicate())
            if len(response[0])>0:
                return str(response[0])[2:-4]
            else:
                return "Error"
        else:
            return "Error"

    except Exception as e:
        if DEBUG==True:
            print(str(e))
        return "Error"

def global_ip(DEBUG=False):
    '''
    return ip with by http://ipinfo.io/ip api
    :param DEBUG:Flag for using Debug mode
    :type DEBUG:bool
    :return: global ip as string
    '''
    try:
        new_session=requests.session()
        response=new_session.get(api_1)
        ip_list=re.findall(ip_pattern,response.text)
        new_session.close()
        return ip_list[0]
    except Exception as e:
        if DEBUG==True:
            print(str(e))
        return "Error"

def get_temp(Zone=0,DEBUG=False):
    '''
    This Function Wrote for Orangepi to read cpu temperature
    :param DEBUG : Flag for using Debug mode
    :param Zone : Thermal Zone Index
    :type DEBUG:bool
    :type Zone:int
    :return: Board Temp as string in celsius
    '''
    try:
        command=open("/sys/class/thermal/thermal_zone"+str(Zone)+"/temp")
        #command=sub.Popen(["cat","/sys/class/thermal/thermal_zone"+str(Zone)+"/temp"],stderr=sub.PIPE,stdin=sub.PIPE,stdout=sub.PIPE)
        #response=list(command.communicate())
        response=command.read()
        return response[:-1]
        #if len(response[0])!=0:
            #return str(response[0])[2:-3]
        #else:
            #return "Error"
    except Exception as e:
        if DEBUG==True:
            print(str(e))
        return "Error"
def convert_bytes(num):
    """
    convert num to idiomatic byte unit
    :param num: the input number.
    :type num:int
    :return: str
    >>> convert_bytes(200)
    '200.0 bytes'
    >>> convert_bytes(6000)
    '5.9 KB'
    >>> convert_bytes(80000)
    '78.1 KB'
    """
    for x in ['bytes', 'KB', 'MB', 'GB', 'TB']:
        if num < 1024.0:
            return "%3.1f %s" % (num, x)
        num /= 1024.0
def ram_total(convert=True):
    '''
    Return total ram of board
    :param convert: Flag for convert mode (using of convert_byte function)
    :type convert:bool
    :return: total ram of board as string
    '''
    response=list(psutil.virtual_memory())
    if convert==True:
        return convert_bytes(int(response[0]))
    else:
        return str(response[0])
def ram_used(convert=True):
    '''
    Return how much ram is using
    :param convert: Flag for convert mode (using of convert_byte function)
    :type convert:bool
    :return: how much ram is using as string
    '''
    response=list(psutil.virtual_memory())
    if convert == True:
        return convert_bytes(int(response[3]))
    else:
        return str(response[3])
def ram_free(convert=True):
    '''
    Return how much ram is available
    :param convert: Flag for convert mode (using of convert_byte function)
    :type convert : bool
    :return: how much ram is available
    '''
    response=list(psutil.virtual_memory())
    if convert == True:
        return convert_bytes(int(response[1]))
    else:
        return str(response[1])
def ram_percent():
    '''
    Return available ram percentage
    :return: availabe ram percentage as string with %
    '''
    response=list(psutil.virtual_memory())
    return str(response[2])+" %"
def zero_insert(input_string):
    '''
    This function get a string as input if input is one digit add a zero
    :param input_string: input digit az string
    :type input_string:str
    :return: modified output as str
    '''
    if len(input_string)==1:
        return "0"+input_string
    return input_string

def time_convert(input_string):
    '''
    This function convert input_string from uptime from sec to DD,HH,MM,SS Format
    :param input_string: input time string  in sec
    :type input_string:str
    :return: converted time as string
    '''
    input_sec=float(input_string)
    input_minute=input_sec//60
    input_sec=int(input_sec-input_minute*60)
    input_hour=input_minute//60
    input_minute=int(input_minute-input_hour*60)
    input_day=int(input_hour//24)
    input_hour=int(input_hour-input_day*24)
    return zero_insert(str(input_day))+" days, "+zero_insert(str(input_hour))+" hour, "+zero_insert(str(input_minute))+" minutes, "+zero_insert(str(input_sec))+" seconds"

def uptime(DEBUG=False):
    '''
    This function return system uptime
    :param DEBUG: Flag for using Debug mode
    :type DEBUG:bool
    :return: system uptime as string
    '''
    try:
        command=open("/proc/uptime")
        response=command.read()
        return time_convert(response[:-1].split(" ")[0])
    except Exception as e:
        if DEBUG==True:
            print(str(e))
        return "Error"
def idletime(DEBUG=False):
    '''
    This function return system idletime
    :param DEBUG: Flag for using Debug mode
    :type DEBUG:bool
    :return: system idle as string
    '''
    try:
        command=open("/proc/uptime")
        response=command.read()
        return time_convert(response[:-1].split(" ")[1])
    except Exception as e:
        if DEBUG==True:
            print(str(e))
        return "Error"
def ping(ip,packet_number=3,DEBUG=False):
    '''
    This function ping ip and return True if this ip is available and False otherwise
    :param ip: target ip
    :param packet_number: numer of packet to size
    :param DEBUG: Flag for using Debug mode
    :type ip :str
    :type packet_number:int
    :type DEBUG:bool
    :return: a boolean value (True if ip is available and False otherwise)
    '''
    try:
        if re.match(ip_pattern,ip)==False:
            raise Exception
        output=str(list(sub.Popen(["ping",ip,"-c",str(packet_number)],stdout=sub.PIPE,stderr=sub.PIPE).communicate())[0])
        if output.find("Unreachable")==-1:
            return True
        else:
            return False
    except Exception as e:
        if DEBUG==True:
            print(str(e))
        return "Error"
def freeup(DEBUG=False):
    '''
    To free pagecache, dentries and inodes:
    :param DEBUG: Flag for using Debug mode
    :type DEBUG:bool
    :return: Amount of freeuped ram as string and converted by convert_bytes()
    '''
    try:
        RAM_before=int(ram_free(convert=False))
        output = sub.Popen(["echo", "3", ">", "/proc/sys/vm/drop_caches"], stdout=sub.PIPE,stderr=sub.PIPE)
        result=list(output.communicate())
        if len(result[1])>0:
            raise Exception
        RAM_after=int(ram_free(convert=False))
        freeuped_ram=RAM_after - RAM_before
        if freeuped_ram>0:
            return convert_bytes(freeuped_ram)
        else:
            return convert_bytes(0)
    except Exception as e:
        if DEBUG==True:
            print(str(e))
        return "Error"

def mount_status(device_name,DEBUG=False):
    '''
    This function return addresses of mounted memory devices in dev by device name
    :param DEBUG: Flag for using Debug mode
    :type DEBUG:bool
    :return: list of memory devices
    '''
    try:
        file = open("/proc/mounts")
        output=file.readlines()
        memory_list=[]
        for item in output:
            temp=item.split(" ")
            if temp[0].find(device_name)!=-1:
                memory_list.append(temp[1])
        if len(memory_list)==0:
            return "u"
        else:
            return memory_list
    except Exception as e:
        if DEBUG==True:
            print(str(e))
        return "Error"

def storage_status(DEBUG=False):
    '''
    This function return all of the inserted memory and their status
    :param DEBUG: Flag for using Debug mode
    :type DEBUG:bool
    :return: All of the inserted memory and their status as dictionary ( device name as keys and mount status (mounted_addresses as list and u --> unmounted) as values
    '''
    try:
        folder_items=os.listdir("/dev/")
        memory_items=[]
        memory_status=[]
        for i in string.ascii_lowercase:
            if "sd"+i+"1" in folder_items:
                memory_items.append("sd"+i+"1")
        for item in memory_items:
            memory_status.append(mount_status(item))
        return dict(zip(memory_items,memory_status))
    except Exception as e:
        if DEBUG==True:
            print(str(e))
        return "Error"

def unmount(ADDRESS,DEBUG=False):
    '''
    This function unmount memory devices by addresses
    :param ADDRESS: address of that device mount on
    :type ADDRESS:str
    :param DEBUG: Flag for using Debug mode
    :type DEBUG:bool
    :return: True if device unmount correctly and False other wise
    '''
    try:
        command = sub.Popen(["umount",ADDRESS], stdout=sub.PIPE, stderr=sub.PIPE)
        output=list(command.communicate())
        if len(output[0])==0 and len(output[1])==0:
            return True
        else:
            return False
    except Exception as e:
        if DEBUG==True:
            print(str(e))
        return "Error"

def unmount_all(DEBUG=False):
    '''
    This function unmount all of the mounted devices
    :param DEBUG: Flag for using Debug mode
    :type DEBUG:bool
    :return: return True if all of the mounted devices unmount correctly
    '''
    try:
        storage_output=storage_status()
        storage_keys=list(storage_output.keys())
        storage_values=list(storage_output.values())
        for i,item in enumerate(storage_values):
            if storage_values[i]!="u":
                print(item)
                for j in item:
                    unmount(j)
        return True
    except Exception as e:
        if DEBUG==True:
            print(str(e))
        return "Error"
def random_generator(number):
    response=""
    i=0
    while(i<number):
        i+=1
        response+=str(random.randint(0,10))
    return response
def mount(device_name,mount_address=None,DEBUG=False):
    '''
    :param device_name: name of device for mounted example = sda1
    :param mount_address: address for mounting device example = /mnt/usb , default value is None in this case function generate random number for mount folder name
    :param DEBUG: Flag for using Debug mode
    :type device_name:str
    :type mount_address:str
    :type DEBUG:bool
    :return: True if device mount correctly and False other wise
    '''
    try:
        if mount_status(device_name)!="u":
            raise Exception
        if mount_address==None:
            mount_address="/mnt/"+random_generator(5)
            command=sub.Popen(["mkdir",mount_address], stdout=sub.PIPE, stderr=sub.PIPE)
        command = sub.Popen(["mount","/dev/"+device_name,mount_address], stdout=sub.PIPE, stderr=sub.PIPE)
        output=list(command.communicate())
        if len(output[0])==0 and len(output[1])==0:
            return True
        else:
            return False
    except Exception as e:
        if DEBUG==True:
            print(str(e))
        return "Error"












