# -*- coding: cp936 -*-
"""
�˺������Ե�����ӡǶ�׶����б��е�������
"""
"""
���ǡ�printapp��ģ�飬�ṩ��һ����Ϊprintapp()�ĺ�����
������������þ��Ǵ�ӡ�б������п��ܰ�����Ҳ���ܲ�������Ƕ���б�
"""
def printapp (the_list,level):
    for each_item in the_list:
        if isinstance(each_item,list):
            printapp(each_item,level+1)
        else:
            for tab_stop in range(level):
                print('\t')
            print(each_item)
            

