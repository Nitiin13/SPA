<?php 
class servicemodel extends CI_Model{

    public function __construct()
	{
		parent::__construct();
		$this->load->database();
		$this->load->helper('url');
	}
	public function register($name,$email,$pass)
	{
		$data=array(
			'name'=>$name,
			'email'=>$email,
			'password'=>md5($pass));
		$query=$this->db->insert('users',$data);
		if($query)
		{	
			//  $this->session->set_flashdata('reg-success','Successfully registered!');
			return true;
			
		}
		else
		{
		//  $this->session->set_flashdata('reg-failed','Try Again!');
			return false;
			
		}
	}
	 public function checkLogin($email,$pass)
	{
		$this->db->where('email',$email);
		$this->db->where('password',md5($pass));
		$query=$this->db->get('users');

		if($query->num_rows>0)
		{
			return $result=$query->result_array();
		}
		else{
            return false;
			// $this->session->set_flashdata('error','invalid creds');
		}
	}
}
