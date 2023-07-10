import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@c/ui/command";
import React from "react";

export const Palette = () => {
  const [open, setOpen] = React.useState(false);

  // Toggle the menu when ⌘K is pressed
  React.useEffect(() => {
    console.log("palette.tsx");
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.ctrlKey) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <CommandDialog
        // className={jetbrainsMono.className}
        open={open}
        onOpenChange={setOpen}
        // value={value}
        // onValueChange={setValue}
        // label={"Command: " + value}
      >
        <CommandInput placeholder="Type a command..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Letters">
            <CommandItem>a</CommandItem>
            <CommandItem>b</CommandItem>
            <CommandSeparator />
            <CommandItem>c</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
