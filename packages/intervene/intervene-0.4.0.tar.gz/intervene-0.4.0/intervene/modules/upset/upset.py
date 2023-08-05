# coding: utf-8

"""
InterVene: a tool for intersection and visualization of multiple genomic region sets
Created on January 10, 2017
@author: <Aziz Khan>aziz.khan@ncmm.uio.no
"""
import sys
import os
import tempfile
from intervene.modules.pairwise.pairwise import get_name
from pybedtools import BedTool


def create_r_script(labels, names, options):
    """
    It create an Rscript for UpSetR plot for the genomic regions.

    """
    #temp_f = tempfile.NamedTemporaryFile(delete=False)
    #temp_f = open(tempfile.mktemp(), "w")
    script_file = options.output+'/'+'intervene_'+options.type+'_UpSet_plot.R'
    temp_f = open(script_file, 'w')

    output_name = options.output+'/'+'intervene_'+options.type+'_UpSet_plot.'+options.figtype

    temp_f.write('#!/usr/bin/env Rscript'+"\n")
    temp_f.write('if (suppressMessages(!require("UpSetR"))) suppressMessages(install.packages("UpSetR", repos="http://cran.us.r-project.org"))\n')
    temp_f.write('library("UpSetR")\n')
    
    if options.figtype == 'pdf':
        temp_f.write(options.figtype+'("'+output_name+'", width='+str(options.figsize[0])+', height='+str(options.figsize[1])+', onefile=FALSE)'+'\n')
    
    elif options.figtype == 'ps':
        temp_f.write('postscript("'+output_name+'", width='+str(options.figsize[0])+', height='+str(options.figsize[1])+')'+'\n')
    else:
        temp_f.write(options.figtype+'("'+output_name+'", width='+str(options.dpi*options.figsize[0])+', height='+str(options.dpi*options.figsize[1])+', res='+str(options.dpi)+')\n')
     
    temp_f.write("expressionInput <- c(")

    last = 1

    shiny = ""

    for key, value in labels.iteritems():
        i = 0
        first = 1
        for x in key:
            if i == 0:
                temp_f.write("'")
                #shiny += "'"
      
            if x == '1':
                if first == 1:
                    temp_f.write(str(names[i]))
                    shiny += str(names[i])
                    first = 0
                else:
                    temp_f.write('&'+str(names[i]))
                    shiny += '&'+str(names[i])

            if i == len(key)-1:
                if last == len(labels):
                    temp_f.write("'="+str(value))
                    shiny += "="+str(value)

                else:
                    temp_f.write("'="+str(value)+',')
                    shiny += "="+str(value)+','
            i += 1
        last +=1
    temp_f.write(")\n")

    options.shiny = True
    #If shiny output
    if options.shiny:

        shiny_import = options.output+'/'+'Intervene_Shiny_App_'+options.type+'_UpSet_module_import.txt'
        shiny_file = open(shiny_import, 'w')
        shiny_file.write("You can go to Intervene Shiny App https://asntech.shinyapps.io/Intervene-app/ and copy/paste the following intersection data to get more interactive figures.\n\n")
        shiny_file.write(shiny)
        shiny_file.close()
    
    else:
        print(shiny)

    if options.showsize:
        options.showsize = 'yes'

    #if options.ninter == 0:
    #    options.ninter = "NA"

    if not options.showzero:
        options.showzero = 'NULL'
    else:
        options.showzero = 'on'

    temp_f.write('upset(fromExpression(expressionInput), nsets='+str(len(key))+', nintersects='+str(options.ninter)+', show.numbers="'+str(options.showsize)+'", main.bar.color="'+options.mbcolor+'", sets.bar.color="'+options.sbcolor+'", empty.intersections="'+str(options.showzero)+'", order.by = "'+options.order+'", number.angles = 0, mainbar.y.label ="'+options.mblabel+'", sets.x.label ="'+options.sxlabel+'")\n')
    temp_f.write('invisible(dev.off())\n')

    #print temp_f.read()
    #print temp_f.name
    #cmd = 'intervene_upset_plot.R %s %s %s' % ('genomic',5,temp_f.name)
    cmd = temp_f.name
    temp_f.close()

    if options.run == True:
        os.system('chmod +x '+cmd)
        os.system(cmd)
        print('\nYou are done! Please check your results @ '+options.output+'. \nThank you for using Intervene!\n')
        sys.exit(1)
    else:
        print('\nYou are done! Please check your results @ '+options.output+'. \nThank you for using Intervene!\n')
        sys.exit(1)

        
def draw_genomic(labels, names, output, fig_type):
    #temp_f = tempfile.NamedTemporaryFile(delete=False)
    temp_f = open(tempfile.mktemp(), "w")
    
    temp_f.write("expressionInput <- c(")
    last = 1
    for key, value in labels.iteritems():
        i = 0
        first = 1
        for x in key:
            if i == 0:
                #print("'")
                temp_f.write("'")      
            if x == '1':
                if first == 1:
                    temp_f.write(str(names[i]))
                    #print(str(names[i]))
                    first = 0
                else:
                    temp_f.write('&'+str(names[i]))
                    #print('&'+str(names[i]))

            if i == len(key)-1:
                if last == len(labels):
                    temp_f.write("'="+str(value))
                else:
                    temp_f.write("'="+str(value)+',')
                #print("'="+str(value)+',')
            i += 1
        last +=1
        #print("'="+str(value)+',')
        #temp_f.write("'="+str(value)+',')
    temp_f.write(")\n")
    #print temp_f.read()
    #print temp_f.name
    temp_f.close()
    cmd = 'upset_plot_intervene.R %s %s %s %s %s ' % ('genomic',len(key),temp_f.name, output, fig_type)
    os.system(cmd)
    sys.exit(1)


def one_vs_rest_intersection(beds, peaks, output, **kwoptions):
    '''
    Compares a set of peaks with several other peaks sets.

    '''
    names = []
    matrix_file = output+'/One_vs_all_peak_set_matrix.txt'
    f = open(matrix_file, 'w')
    
    f.write('peak_id')
    #f.write('peak_id\tchrom\tstart\tend')

    for bed in beds:
        names.append(get_name(bed))
        f.write('\t' + str(get_name(bed)))
    #main_int.append(names)

    peaks = BedTool(peaks[0])
    f.write('\n')
    for i in peaks:
        #region_int = []
        peak_id = str(i.chrom)+"_"+str(i.start)+"_"+str(i.end)
        f.write(peak_id)
        #f.write(peak_id + '\t' + i.chrom + '\t' + str(i.start) + '\t' + str(i.end))

        for bed in beds:
            b = BedTool(bed)
            int_count = BedTool(str(i), from_string=True).intersect(b).count()
            if (int_count > 0):
                #region_int.append("1")
                f.write('\t' + str(1))
            else:
                #region_int.append("0")
                f.write('\t' + str(0))
        f.write('\n')
        #main_int.append(region_int)
        #matrix[peak_id] = region_int
    f.close()

    return matrix_file
    