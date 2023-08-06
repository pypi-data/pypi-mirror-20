# -*- coding: UTF-8 -*- 
import time
from appium import webdriver

class iosMethod():
    logger = None
    '''appium公共方法封装集'''
    def __init__(self,driver):
        self.driver = driver
    def __setlog__(self,log):
        self.logger = log
    def __log__(self,msg):
        if self.logger == None:
            print msg
        else:
            self.logger.info(msg)
    def click(self,locator):
        self.wait(locator)
        self.__log__("click " + str(locator[1]))
        self.driver.find_element(*locator[0]).click()
    def isExit(self,locator):
        res = True
        try:
            self.wait(locator)
            self.__log__("isExit " + str(locator[1]))
            self.driver.find_element(*locator[0])
        except Exception,e:
            res = False
        return res
    def setText(self,locator,text):
        self.wait(locator)
        self.__log__("setText " + str(locator[1]))
        self.driver.find_element(*locator[0]).set_value(text)
        return
    def getText(self,locator):
        self.wait(locator)
        self.__log__("getText " + str(locator[1]))
        return self.driver.find_element(*locator[0]).get_attribute('label')
    def getValue(self,locator):
        self.wait(locator)
        self.__log__("getText " + str(locator[1]))
        return self.driver.find_element(*locator[0]).get_attribute('value')
    def Sleep(self,t):
        time.sleep(t)
    #轻触一个界面元素
    def tap(self,locator):
        self.wait(locator)
        a = self.driver.find_element(*locator[0])
        l = a.location
        x = int(l.get('x'))+20
        y = int(l.get('y'))+20
        self.driver.tap([(x,y)],1000)
    def tap2(self,locator,time=500):
        self.wait(locator)
        a = self.driver.find_element(*locator[0])
        l = a.location
        x = int(l.get('x'))+20
        y = int(l.get('y'))+20
        self.driver.tap([(x,y)],time)
    #获取一个列表的数量
    def getLength(self,locator):
        self.wait(locator)
        return len(self.driver.find_elements(*locator[0]))
    #判断一个列表中的元素对应个数的位置是否存在
    def isExit2(self,locator,count):
        self.wait(locator)
        res = False
        try:
            list = self.driver.find_elements(*locator[0])
            for i,one in enumerate(list):
                if i == count:
                    res = True
        except Exception,e:
            res = False
        return res
    def getText2(self,locator,count):
        self.wait(locator)
        result =''
        if len(locator) == 3:
            list = self.driver.find_elements(*locator[0])
            for i,one in enumerate(list):
                if i == count:
                    result = one.get_attribute('name')
                    break
        elif len(locator) == 4:
            list = self.driver.find_elements(*locator[0])
            for i,one in enumerate(list):
                if i == count:
                    result = one.find_element(*locator[3]).get_attribute('name')
                    break
        if len(result) > 0 :
            pass
            #self.logger.info(u'查找到信息：'+result)
        else:
            pass
            #self.logger.info(u'未找到信息')
        return result
    def click2(self,locator,count):
        self.wait(locator)
        if len(locator) == 3:
            list = self.driver.find_elements(*locator[0])
            for i,one in enumerate(list):
                if i == count:
                    one.click()
                    break
        elif len(locator) == 4:
            list = self.driver.find_elements(*locator[0])
            for i,one in enumerate(list):
                if i == count:
                    one.find_element(*locator[3]).click()
                    break
        return
    def setText2(self,locator,count,text):
        self.wait(locator)
        result =''
        list = self.driver.find_elements(*locator[0])
        for i,one in enumerate(list):
            if i == count:
                self.DeleteStr()
                one.set_value(text)
                break
        return
    def findelement(self,locator):
        ele = None
        try:
            ele = self.driver.find_elements(*locator[0])
        except:
            print traceback.print_exc()
        return ele
    def clearText(self, locator):
        self.wait(locator)
        ele = self.driver.find_elements(*locator[0])
        ele.set_value("")
        return
    def wait(self, locator):
        self.__log__("wait time:" + str(locator[2]))
        self.driver.implicitly_wait(locator[2])