<?php 
 class Index extends CI_Controller{
    public  function __construct()
    {
       parent::__construct();
    //    $this->load->model('servicemodel');
   }
    public function index(){
        $sess=$this->session->userdata('isloggedIn');
        // var_dump($sess);
        if($sess)
        {
         $data['session']=$this->session->userdata('isloggedIn');
        }
        else{
            $data['session']='0';
        }
        $this->load->view('index',$data);
    }
}