﻿using DentistRegistration.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DentistRegistration.Interfaces
{
    public interface IAvatarUpload
    {
        bool Update(AvatarViewModel avatar);
    }
}