def print_lol(the_list,the_level):
        for each_item in the_list:
                if isinstance(each_item,list):
                        print_lol(each_item,the_level+1)
                else:
                        for each_level in range(the_level):
                                print("\t",end='')
                        print(each_item)
