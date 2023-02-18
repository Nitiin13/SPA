<?php
 class Service extends CI_Controller{
 	public  function __construct()
 	{
        parent::__construct();
        $this->load->model('servicemodel');
    }
    public function check_Sess()
    {
         $isloggedIn=$this->session->userdata('isloggedIn');
        // var_dump($isloggedIn);
        if(!$isloggedIn)
        {
             redirect('service/');
        }
        
      }
    public function index(){
      // $this->check_Sess();
        // $this->load->view('templates/header');
        $this->load->view('angular/index.html');
        // $this->load->view('templates/footer');
    }    

    public function usertickets()
    {
        $this->check_Sess();
        $id=$this->session->userdata('ses_id');
        $jsonArray=$this->servicemodel->get_ticket($id);
        $this->output->set_content_type('application/json')->set_output(json_encode($jsonArray));        
    }
    public function ticket_portal()
    {  // th$is->ticket_portal();
         $this->check_Sess();
        $this->load->view('templates/header');
        $this->load->view('service/ticket_portal');
        $this->load->view('templates/footer');
        
    
    }
    public function admin_view_tickets(){
        // $this->check_Sess();
        $all_tickets=$this->service_model->get_ticket();
        $this->output->set_content_type('application/json')->set_output(json_encode($all_tickets));
    }
  
    public function logout()
    {
        $this->session->unset_userdata('isloggedIn');
        $this->session->unset_userdata();
  
        $this->session->sess_destroy();
    
        echo true;
    }
    public function register()
    {

        $this->load->view('templates/header');
        $this->load->view('service/register');
        $this->load->view('templates/footer');  
    }
    public function authenticate()
    {
       
            $req=json_decode(file_get_contents('php://input'),true);
            $email=$req['email'];
            $pass=$req['pass']; 
            if($this->servicemodel->checkLogin($email,$pass))
            {  
                        $user_array=$this->servicemodel->checkLogin($email,$pass);
                        foreach($user_array as $user)
                        {
                            $user_id=$user['userid'];
                            $user_email=$user['email'];
                            $user_role=$user['role'];
                        }
                        $session_array=array(
                                'ses_id'=>$user_id,
                                'ses_email'=>$user_email,
                                'ses_role'=>$user_role,
                                'isloggedIn'=>TRUE);
                        $this->session->set_userdata($session_array);
                //         $role=$this->session->userdata('ses_role');
                // $this->output->set_content_type('application/json')->set_output(json_encode($role)); 
                echo true;
            }
            else
            {
                echo false;

            }
           
        }
    
    public function registerUser()
    {
        $req=json_decode(file_get_contents('php://input'),true);
        $name=$req['name'];
        $email=$req['email'];
        $pass=$req['pass'];
        if($this->servicemodel->register($name,$email,$pass))
        {
            echo true;
        }
        else{
                echo false;        
            }
   
    }
    public function admin_portal()
    {
            $this->check_Sess();
         $this->load->view('templates/header');
        $this->load->view('service/admin_portal');
    }
    public function ticket_add()
    {
            $req=json_decode(file_get_contents('php://input'),true);
            $title=$req['title'];
            $desc=$req['desc']; 
            $image='';
   
            // $title=$this->input->post('ticket-title');
            // $desc=$this->input->post('ticket-detail');  
            // $config['upload_path'] =APPPATH.'../uploads/';
            // $config['allowed_types']='jpg|png|pdf|jpeg';
            //  $new_name = date('Y-m-d') . '-' . $_FILES['attachment']['name'];
            //  $config['file_name']=$new_name;
            //     $this->upload->initialize($config);
            // if($_FILES['attachment']['error']==0) 
            // {
            //          if($this->upload->do_upload('attachment'))
            //         {
            //             $arr=$this->upload->data();
            //         }
            //         $image=$arr['file_name'];
            //     }
            //     else
            //     {
            //         $image='';
            //     }
            $userid=$this->session->userdata('ses_id');
            if($this->servicemodel->ticket_addition($title,$desc,$image,$userid))
            {
                echo true;

                // redirect('service/ticket_portal');
            }
            else
            {
               echo "failed";     
            }    
}
}