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
    #crimeFilterData<-districtFilter()
      crimeFilterData<-crimeData
    } else{
    #crimeFilterData<-districtFilter()
    #crimeFilterData<-crimeFilterData[crimeFilterData$Crime.type==input$crimeType,]}
      crimeFilterData<-crimeData[crimeData$Crime.type==input$crimeType,]}
  })
  
  dateFilter<-reactive({
    #dateFilterData<-crimeFilter()
    #dateFilterData<-dateFilterData[dateFilterData$dates >= input$dateRange[1] & dateFilterData$dates<=input$dateRange[2],]
    dateFilterData<-crimeData[crimeData$dates >= input$dateRange[1] & crimeData$dates<=input$dateRange[2],]
  
  })
  
 
  output$pinpointMap <- renderLeaflet({
    district_crime<-inner_join(districtFilter(),crimeFilter())
    district_crime_date<-inner_join(district_crime,dateFilter())
      assam_leaflet %>%
      addMarkers(data = district_crime_date,~lng, ~lat,  popup= popupTable(district_crime_date))
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
      crimeFilterAnalytics<-crimeData[crimeData$Crime.type==input$crimeTypeAnalytics,]}
  })
  
  dateFilterAnalytics<-reactive({
    dateFilterAnalytics<-crimeData[crimeData$dates >= input$dateRangeAnalytics[1] & crimeData$dates<=input$dateRangeAnalytics[2],]
    
  })
  
  #Pie Plot in Tab 2
   output$piePlot <- renderPlotly({
  district_date<-inner_join(districtFilterAnalytics(),dateFilterAnalytics())
  piecrimeCount<-count(district_date, vars=c("Crime.type"))
  plot_ly(piecrimeCount, labels = ~Crime.type, values=~freq,type = 'pie') 
  
 })
  
  crimeComparatorType<-reactive({
  
  crime_date<-inner_join(crimeFilterAnalytics(),dateFilterAnalytics())
  crimeCount<-count(dateFilterAnalytics(), vars=c("crimeDistricts" , "Crime.type"))
  crimeSpread<-spread(crimeCount,Crime.type,freq)
  crimeSpread[is.na(crimeSpread)] <- 0
  rownames(crimeSpread)<-crimeSpread[,1]
  crimeSpread<-crimeSpread[,-1]
  crimeSpread$All<-rowSums(crimeSpread)
  colnames(crimeSpread)<-crimeSpreadNames
  crimeTypeVector<-crimeSpread[,input$crimeTypeAnalytics]
  return(crimeTypeVector)
  
  })

  
  output$districtComparatorPlot <- renderPlot({
    crimeComparatorType<-crimeComparatorType()
    barplot(crimeComparatorType,names.arg=assamDistricts)
   # plot_ly(assamDistricts, crimeComparatorType, type = "bar")
  })
    
    
  
    
    
    
  })

      #End of Tab 2(Analytics)  
  
  
  

