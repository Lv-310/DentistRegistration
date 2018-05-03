using System.Configuration;
using System.Web.Configuration;

namespace DentistRegistration.Servises
{
    public sealed class EncryptingConfiguration
    {
        public static void ProtectSection(string sectionName,
                                   string provider)
        {
            Configuration config =
                WebConfigurationManager.
                    OpenWebConfiguration("/");

            ConfigurationSection section =
                         config.GetSection(sectionName);

            if (section != null &&
                      !section.SectionInformation.IsProtected)
            {
                section.SectionInformation.ProtectSection(provider);
                config.Save();
            }
        }

        public static void UnProtectSection(string sectionName)
        {
            Configuration config =
                WebConfigurationManager.
                    OpenWebConfiguration("/");

            ConfigurationSection section =
                      config.GetSection(sectionName);

            if (section != null &&
                  section.SectionInformation.IsProtected)
            {
                section.SectionInformation.UnprotectSection();
                config.Save();
            }
        }
    }
}