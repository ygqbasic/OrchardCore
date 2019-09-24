using OrchardCore.Modules.Manifest;

[assembly: Module(
    Name = "AdvancedFlows",
    Author = "The Orchard Team",
    Website = "https://orchardproject.net",
    Version = "1.0.0"
)]

[assembly: Feature(
    Id = "OrchardCore.AdvancedFlows",
    Name = "AdvancedFlows",
    Description = "Provides an advanced FlowMetadata editing experience",
    Dependencies = new [] { "OrchardCore.Flows" },
    Category = "Content"
)]
