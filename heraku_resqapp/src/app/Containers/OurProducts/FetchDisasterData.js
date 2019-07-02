
const fetchDisasterData = async (props) => {  
             console.log(" i am in  FETCHDISASERDATA in RESQHOME ");
                 var locFilters = [];
                 var locDateRange = '';
                 const endPoint = "http://185.178.86.165:8080/api/qresq/search"
                 if(this.props.disasterType !== 'all')
                 {
                     locFilters = [{
                         fieldName: 'disasterType',
                         type: 'string',
                         value: this.props.disasterType 
                     }]
                 }
                 console.log("locFilters",locFilters);
                 
                 if(this.props.dateRange){
                     locDateRange = this.props.dateRange;
                 }
                 await fetch(endPoint,{
                     headers: {
                             'Accept': 'application/json',
                             'Content-Type': 'application/json'
                             },
                             method: "POST",
                             body: JSON.stringify({size: 2000, indexName: 'gdacs_alerts', 
                             filters: locFilters   })
             
                  })
                 .then(response => await response.json()) 
                 .then(json => {
                     this.setState({
                         disasterData: json.results,
                         fetchFlag: true
                     })  
                     console.log(JSON.stringify(json));
                 })
                 .catch(error =>{
                   console.log("ERROR" + error);     
                 })
               
             console.log("leaving  FETCHDISASERDATA in RESQHOME"); 
     }