fprintf(1,'Executing %s at %s:\n',mfilename,datestr(now));
ver,
try,
addpath('/Users/liberty/Documents/MATLAB/spm12');
addpath(genpath('/Users/liberty/Documents/UCSF/imaging/img_pipe/img_pipe/surface_warping_scripts'));                                  plot_recon_anatomy_compare_warped('/Applications/freesurfer','/Applications/freesurfer/subjects','EC121_test','cvs_avg35_inMNI152','rh','TDT_elecs_all','True');
,catch ME,
fprintf(2,'MATLAB code threw an exception:\n');
fprintf(2,'%s\n',ME.message);
if length(ME.stack) ~= 0, fprintf(2,'File:%s\nName:%s\nLine:%d\n',ME.stack.file,ME.stack.name,ME.stack.line);, end;
end;