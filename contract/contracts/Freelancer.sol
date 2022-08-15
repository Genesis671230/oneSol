
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @dev Structs mappings Events and Functions are used variable
 */


 error Freelancer_INSUFFICIENT_BALANCE();
 error Freelancer_ONLY_WHITELISTED_FREELANCERS();
 error Freelancer_ONLY_ACTIVE_JOB();
 error Freelancer_INACTIVE_JOB();
 error Freelancer_DEADLINE();
 error Freelancer_ONLY_HIRED_FREELANCER();
 error Freelancer_ONLY_PENDING();
contract Freelancer {


    uint256 public _jobIds;

    enum ProjectStatus{ACTIVE,PENDING,COMPLETE}

    event EVENT_NEWJOB(uint256 job_id, string job_title,uint256 job_deadline, uint256 job_price);

    struct JobDetails{
        string title;
        uint256 deadline;
        uint256 price;
        bool applied;
        address hiredFreelancer;
        ProjectStatus status;
    }


    mapping(uint256 => JobDetails) public JobsRegistry;
    mapping(address => bool) public whiteListFreelancer;


     modifier insufficientBalance(uint256 _price) {
          if(msg.value < _price)
          {revert Freelancer_INSUFFICIENT_BALANCE();}
        _;
    }


     modifier onlywhitelistedFreelancer() {
          if(whiteListFreelancer[msg.sender] != true)
          {revert Freelancer_ONLY_WHITELISTED_FREELANCERS();}
        _;
    }



     modifier onlyActiveJobs(uint256 _jobid) {
           if(JobsRegistry[_jobid].status != ProjectStatus.ACTIVE)
          {revert Freelancer_ONLY_ACTIVE_JOB();}

        _;
    }

     modifier no_jobs() {
     if(_jobIds < 1)
          {revert Freelancer_ONLY_ACTIVE_JOB();}
        _;
    }

    modifier only_hired_freelancer(uint256 _jobid) {
          if(JobsRegistry[_jobid].hiredFreelancer != msg.sender)
          {revert Freelancer_ONLY_HIRED_FREELANCER();}
        _;
    }
    modifier only_before_deadline(uint256 _jobid) {
        if(block.timestamp > JobsRegistry[_jobid].deadline)
          {revert Freelancer_DEADLINE();}
        _;
    }

    modifier only_Pending_Project(uint256 _jobid) {
      if(JobsRegistry[_jobid].status != ProjectStatus.PENDING)
          {revert Freelancer_ONLY_PENDING();}
        _;
    }

    /**
    @dev whitelisting freelancer using mapping called whiteListFreelancer
    @notice This funciton will register freelancer as whitelisted
    */
    function whitelistF() external {
         whiteListFreelancer[msg.sender] = true;
    }
    function checkWhitelistedF() external view returns(bool) {
        return whiteListFreelancer[msg.sender];
    }



    /**
    @notice This funcition allow client to post job
    

    @dev function must be called with minimum amount of ether 
         mentioned as price of the project, Struct name JobDetails is used to 
         set project in mapping
    */
    function PostJob(string memory _title,uint256 _deadline, uint256 _price)
    public payable 
    insufficientBalance(_price)
    {
        _jobIds++;
        uint256 time = block.timestamp + _deadline ;
        JobsRegistry[_jobIds] = JobDetails(_title,time,_price,false,address(0x0),ProjectStatus.ACTIVE);
        emit EVENT_NEWJOB(_jobIds,_title,_deadline,_price);

    }




    function applyForJob(uint256 _jobid) external 
    onlywhitelistedFreelancer
    onlyActiveJobs(_jobid)
    {   
      JobsRegistry[_jobid].applied = true;        
      JobsRegistry[_jobid].hiredFreelancer = msg.sender;
      JobsRegistry[_jobid].status = ProjectStatus.PENDING;
    }




    function completeJob(uint256 _jobid)
     external 
     only_hired_freelancer(_jobid) 
     only_before_deadline(_jobid)
     only_Pending_Project(_jobid)
    {
        JobsRegistry[_jobid].status = ProjectStatus.COMPLETE;
        payable(msg.sender).transfer(JobsRegistry[_jobid].price);
    }
   

    function listJobs() external view
      no_jobs  returns(JobDetails[] memory )
      {
      JobDetails[] memory list = new JobDetails[](_jobIds);
      for(uint256 i = 1;i<=_jobIds;i++ )
      {list[i - 1] = JobsRegistry[i];}
      return list;
    }
    
    function jobById(uint256 _id)
    external view returns(JobDetails memory){
      return JobsRegistry[_id];
    }


    function totalJobSupply()
    external view returns(uint256){
      return _jobIds;
    } 
}


