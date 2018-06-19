using NUnit.Framework;
using Moq;
using DentistRegistration.Interfaces;
using DentistRegistration.Models;

namespace DentistRegistration.Controllers.Tests
{
    [TestFixture()]
    public class DoctorsControllerTests
    {
        [Test()]
        public void GetDoctorTest()
        {
            Mock<IRepositoryCRU<Doctor>> myMock = new Mock<IRepositoryCRU<Doctor>>();
            myMock.Expect(m => m.GetById(It.IsAny<int>())).Returns((int i) => new Doctor() {Id= i, FirstName="test", LastName = "test"});

            var doc = myMock.Object.GetById(8);
            Assert.AreEqual(doc.Id, 8);

            myMock.VerifyAll();
        }
    }
}