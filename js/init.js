var App = React.createClass({
  
  getInitialState: function() {
    return {
      jobs: []
    }
  },
  
  componentDidMount: function() {
    // Is there a React-y way to avoid rebinding `this`? fat arrow?
    var th = this;
    this.serverRequest = 
      axios.get(this.props.source)
        .then(function(result) {    
          th.setState({
            jobs: result.data.jobs
          });
        })
  },
  
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  
  render: function() {
    return (
      <div>
        <h1>Job List</h1>
        {this.state.jobs.map(function(job) {
          return (
            <div key={job.url} className="job">
              <a href={job.url}>
                {job.company_name}
                is looking for a 
                {job.term}
                {job.title}
              </a>
            </div>
          );
        })}
      </div>
    )
  }
});

React.render(<App source="http://codepen.io/jobs.json" />, document.querySelector("#root"));
