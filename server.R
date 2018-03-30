#
# This is the server logic of a Shiny web application. You can run the
# application by clicking 'Run App' above.
#
# Find out more about building applications with Shiny here:
#
#    http://shiny.rstudio.com/
#

library(shiny)

# Define server logic required to draw a histogram
shinyServer(function(input, output,session) {

#Output for Tab 1(crime map)  
  districtFilter <- reactive({
    if (input$district=="All Districts"){
      districtFilterData<-crimeData
    } else{
      districtFilterData<-crimeData[crimeData$crimeDistricts==input$district,]}
  })
  
  crimeFilter <- reactive({
    if (input$crimeType=="All Crimes"){
      crimeFilterData<-crimeData
    } else{
      crimeFilterData<-crimeData[crimeData$crimeType==input$crimeType,]}
  })
  
  dateFilter<-reactive({
    dateFilterData<-crimeData[crimeData$dates >= input$dateRange[1] & crimeData$dates<=input$dateRange[2],]
  
  })
  mapType<-reactive({
    input$mapType
  })
  
  
  output$Map <- renderLeaflet({
    
    if(mapType()=="Crime Map"){
    district_crime<-inner_join(districtFilter(),crimeFilter())
    district_crime_date<-inner_join(district_crime,dateFilter())
      assam_leaflet %>%
      addMarkers(data = district_crime_date,~lng, ~lat,  popup= popupTable(district_crime_date))
    }else{
      districtCount<-count(crimeData,vars=c("crimeDistricts"))
      bins <- c(0,3,6,9, 12, 15, 18, 21, 24,27,30,Inf)
      pal <- colorBin("YlOrRd", domain = districtCount$freq, bins = bins)
  
      labels <- sprintf(
        "<strong>%s</strong><br/>%s Crimes",
        assam$DISTRICT, districtCount$freq
      ) %>% lapply(htmltools::HTML)
      
      assam_leaflet %>% addPolygons(
        fillColor = ~pal(districtCount$freq),
        weight = 2,
        
        opacity = 1,
        
        dashArray = "3",
        
        color = "white",
        fillOpacity = 0.7,
        highlight = highlightOptions(
          weight = 5,
          color = "#666",
          bringToFront = TRUE),
        label = labels,
        
      ) %>% setView(92.9376,26.2006, zoom = 6.5)
      
      
      
    }
    
       })
  
    
  
    
  
#End of Tab 1 (Crime Map)
  #######################

#Beg of Tab 2(Analytics)
  districtFilterAnalytics <- reactive({
    if (input$districtAnalytics=="All Districts"){
      districtFilterAnalytics<-crimeData
    } else{
      districtFilterAnalytics<-crimeData[crimeData$crimeDistricts==input$districtAnalytics,]}
  })
  
  crimeFilterAnalytics <- reactive({
    if (input$crimeTypeAnalytics=="All Crimes"){
      crimeFilterAnalytics<-crimeData
    } else{
      crimeFilterAnalytics<-crimeData[crimeData$crimeType==input$crimeTypeAnalytics,]}
  })
  
  dateFilterAnalytics<-reactive({
    dateFilterAnalytics<-crimeData[crimeData$dates >= input$dateRangeAnalytics[1] & crimeData$dates<=input$dateRangeAnalytics[2],]
    
  })
  
  #Pie Plot in Tab 2
   output$piePlot <- renderPlotly({
  district_date<-inner_join(districtFilterAnalytics(),dateFilterAnalytics())
  piecrimeCount<-count(district_date, vars=c("crimeType"))
  plot_ly(piecrimeCount, labels = ~crimeType, values=~freq,type = 'pie') 
  
 })
  
   #District Comparator in Tab 2
  crimeComparatorType<-reactive({
  
  crime_date<-inner_join(crimeFilterAnalytics(),dateFilterAnalytics())
  crimeCount<-count(dateFilterAnalytics(), vars=c("crimeDistricts" , "crimeType"))
  crimeSpread<-spread(crimeCount,crimeType,freq)
  crimeSpread[is.na(crimeSpread)] <- 0
  rownames(crimeSpread)<-crimeSpread[,1]
  crimeSpread<-crimeSpread[,-1]
  crimeSpread$All<-rowSums(crimeSpread)
  colnames(crimeSpread)<-crimeSpreadNames
  crimeTypeVector<-crimeSpread[,input$crimeTypeAnalytics]
  return(crimeTypeVector)
  
  })

  
  #output$districtComparatorPlot <- renderPlot({
   # crimeComparatorType<-crimeComparatorType()
    #barplot(crimeComparatorType,names.arg=assamDistricts)
   # plot_ly(assamDistricts, crimeComparatorType, type = "bar")
  #})
    
    
  
  
  output$trendPlot <- renderPlotly({
    crime_district<-inner_join(districtFilterAnalytics(),crimeFilterAnalytics())
    crime_date<-inner_join(crimeFilterAnalytics(),dateFilterAnalytics())
    crime_date_district<-inner_join(crime_date,districtFilterAnalytics())
    dateTrendCount<-count(crime_date_district,vars=c("dates"))
    
    dateTrend <- dateTrendCount$dates
    freqTrend <- dateTrendCount$freq
    plot_ly(x = ~dateTrend, y = ~freqTrend,type = 'scatter', mode = 'lines')

  })
  
    
  })

      #End of Tab 2(Analytics)  
  
  
  

