using System;
using System.IO;
using System.Windows.Forms;

namespace CalculatorApp
{
    static class Program
    {
        [STAThread]
        static void Main()
        {
            AppDomain.CurrentDomain.UnhandledException += (s, e) =>
            {
                try
                {
                    File.WriteAllText("crash.log", e.ExceptionObject?.ToString() ?? "Unknown exception");
                }
                catch
                {
                    // Ignore failure writing crash log
                }

                MessageBox.Show(
                    "Произошла непредвиденная ошибка. Подробности сохранены в файле crash.log рядом с программой.",
                    "Ошибка приложения",
                    MessageBoxButtons.OK,
                    MessageBoxIcon.Error
                );
            };

            ApplicationConfiguration.Initialize();
            Application.Run(new MainForm());
        }
    }
}
