using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DentistRegistration.Models
{
    public class Doctor
    {
        private int id;
        private string firstname;
        private string lastname;
        private long phonenum;
        private byte cabnum;
        private string speciality;
        private string doc_password;

        public int Id
        {
            get
            {
                return id;
            }

            set
            {
                id = value;
            }
        }

        public string FirstName
        {
            get
            {
                return firstname;
            }

            set
            {
                firstname = value;
            }
        }

        public string LastName
        {
            get
            {
                return lastname;
            }

            set
            {
                lastname = value;
            }
        }

        public long PhoneNum
        {
            get
            {
                return phonenum;
            }

            set
            {
                phonenum = value;
            }
        }

        public byte CabNum
        {
            get
            {
                return cabnum;
            }

            set
            {
                cabnum = value;
            }
        }

        public string Speciality
        {
            get
            {
                return speciality;
            }

            set
            {
                speciality = value;
            }
        }

        public string Doc_password
        {
            get
            {
                return doc_password;
            }

            set
            {
                doc_password = value;
            }
        }
    }
}