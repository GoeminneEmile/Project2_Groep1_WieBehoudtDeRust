using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace project2Functions
{
    class Hash
    {
        public string ComputeHash(string input)
        {
            // Hash function
            Byte[] inputBytes = Encoding.UTF8.GetBytes(input);
            HashAlgorithm hashAlgorithm = new SHA256CryptoServiceProvider();
            Byte[] hashedBytes = hashAlgorithm.ComputeHash(inputBytes);

            return BitConverter.ToString(hashedBytes);
        }
    }
}
